import Handlebars from 'handlebars';

Handlebars.registerHelper('get', function (obj, key) {
    return obj[key];  // Return the value of the object property based on the key
});

const templateString = 
`
#################################
#### SHBSW1001 - DayN config ####
#################################
!
hostname //hostname
!
no ip domain lookup
ip domain name accenture.com
no service tcp-small-servers
no service udp-small-servers
no service finger
no ip http server
no ip http secure-server
ip http authentication local
no ip bootp server
no service pad
no ip rcmd rcp-enable
service password-encryption
service tcp-keepalives-in
service tcp-keepalives-out
no service config
no ip source-route
no service dhcp
service sequence-numbers
service timestamps log datetime msec
service timestamps debug datetime msec
ip subnet-zero
ip classless
ip routing
ip cef distributed
cdp run
lldp run
udld enable
ip igmp snooping
clock timezone utc 0 0
process cpu threshold type total rising 90 interval 600
stack-mac persistent timer 0
ipv6 unicast-routing
ipv6 cef distributed
!
crypto key ****** rsa modulus 2048
ip ssh version 2
ip ssh authentication-retries 3
ip ssh time-out 120
!
banner login ^
-=*=- -=*=- -=*=- -=*=- -=*=- -=*=- -=*=- -=*=-
  S Y S T E M  A C C E S S  W A R N I N G
-=*=- -=*=- -=*=- -=*=- -=*=- -=*=- -=*=- -=*=-
You have connected to a private network. This system is solely for the use of authorized users for official purposes. You have no expectation of privacy in its use. All activities are monitored and recorded by system personnel.
Any information on this computer system may be intercepted, recorded, read, copied, and disclosed by and to authorized personnel for official purposes, including criminal investigations.
Unauthorized access or use of this computer system may subject violators to criminal, civil, and/or administrative action.
Access or use of this system by any person whether authorized or unauthorized, constitutes and evidences an express consent to such terms.
If you have connected to this system by mistake, disconnect now.
^
!
!
!
!
aaa new-model
aaa session-id common
aaa common-criteria policy acn_policy
 min-length 8
 max-length 15
 numeric-count 1
 upper-case 1
 lower-case 1
 special-case 1
!
!
!
tacacs server frcau1001
 address ipv4 10.115.218.54
 key ******
tacacs server chiau1001
 address ipv4 10.63.79.198
 key ******
tacacs server sgpau1001
 address ipv4 10.226.26.12
 key ******
!
aaa group server tacacs+ ACN
 server name frcau1001
 server name chiau1001
 server name sgpau1001
 ip tacacs source-interface vlan99
!
aaa authentication attempts login 5
aaa authentication password-prompt Local_Password:
aaa authentication username-prompt Local_Username:
aaa authentication login default group ACN local
aaa authentication enable default group ACN enable
aaa accounting update newinfo
aaa accounting exec default start-stop group ACN
aaa accounting commands 15 default stop-only group ACN
aaa accounting network default start-stop group ACN
aaa accounting connection default start-stop group ACN
aaa accounting system default start-stop group ACN
!

---dynamic content---
vlan 2
 name native
vlan 10
 name Server
vlan 12
 name Wireless_Devices_VLAN
vlan 13
 name Blackhole
vlan 30
 name Wired_LAN
vlan 31
 name Wireless_LAN
vlan 35
 name wifi-md
vlan 40
 name Wired_LAN_30F
vlan 50
 name WDS
vlan 76
 name VLAN_iAdeaRoom
vlan 99
 name LAN_MGMT
vlan 301
 name VC_Hardware
vlan 305
 name Wired_LYNC-HARDPHONE-SFB
vlan 950
 name ACN_CIO
vlan 960
 name Internet_Primary
vlan 965
 name Zscaler
vlan 3901
 name Shared_Innovation
vlan 3960
 name Shared_IoT
vlan 3966
 name Wifi-guest
vlan 3967
 name quarantine
------------------------------------
!
--------Dynamic Content-----
vtp domain Shanghai_ZF_Officedomain
----------------------------------
vtp version 3
vtp mode transparent
!
ip dhcp snooping
no ip dhcp snooping information option
ip arp inspection validate src-mac dst-mac ip allow zeros
---------------Dynamic content---------------------------------
ip dhcp snooping vlan 12,30,31,40,50,305,3901,3960,3966,3967
ip arp inspection vlan 12,30,31,40,50,305,3901,3960,3966,3967
-------------------------------------------------------------
!
errdisable recovery cause arp-inspection
errdisable recovery interval 30
!
ipv6 dhcp guard policy DHCP_Guard_Uplink 
 device-role server
 trusted-port
!
ipv6 dhcp guard policy DHCP_Guard_Edge
 device-role client
 no trusted-port
!
ipv6 source-guard policy IPv6_SG_policy
 permit link-local
 validate address
!
device-tracking policy DT_Trunk
 device-role switch
 trusted-port
! 
ipv6 nd raguard policy RA-Guard_Uplink
 device-role router
!
ipv6 nd raguard policy RA-Guard_Edge
 device-role host
!
access-list 70 remark ACL owned and managed by CCS.DIM.NetworkMgmt.Arch <CCS.DIM.NetworkMgmt.Arch@accenture.com> change not allowed under any circumstances.
access-list 70 permit 10.15.152.0 0.0.3.255
access-list 70 permit 10.15.216.0 0.0.3.255
access-list 70 permit 10.115.216.0 0.0.3.255
access-list 70 permit 10.226.24.0 0.0.3.255
!
no snmp-server community public
no snmp-server community system
no snmp-server community private
snmp-server community T00lsstr1ng$$ RO 70
snmp-server trap-source vlan99
snmp-server location CHN_SHA_ZHA
snmp-server contact ACC-NOC@accenture.com
snmp-server enable traps snmp authentication linkdown linkup coldstart warmstart
snmp-server enable traps tty
snmp-server enable traps vtp
snmp-server enable traps cpu threshold
snmp-server enable traps stackwise
snmp-server enable traps envmon
snmp-server enable traps config
snmp-server enable traps bridge newroot topologychange
snmp ifmib ifindex persist
snmp-server host 10.115.216.11 version 2c T00lsstr1ng$$
snmp-server host 10.115.216.12 version 2c T00lsstr1ng$$
!
ip access-list standard 80
 10 permit 10.115.218.53
 20 permit 10.63.71.149
 30 permit 10.226.26.11
!
ntp access-group peer 80
ntp server 10.115.218.53 prefer
ntp server 10.63.71.149
ntp server 10.226.26.11
!
logging buffered 51200 warning
logging console critical
logging trap notifications
logging facility local1
logging source-interface vlan99
logging host 170.251.160.1
!
spanning-tree etherchannel guard misconfig
spanning-tree portfast bpduguard default
no spanning-tree portfast bpdufilter default
spanning-tree portfast default
spanning-tree extend system-id
!
spanning-tree mst configuration
 name region1
 revision 10
 instance 1 vlan 1-4094
 exit
spanning-tree mode mst
spanning-tree mst 1 priority 0
!
ip access-list extended voice-ipv4
  Remark Cisco IPT
  permit udp 10.209.71.0 0.0.0.255 any range 16384 32767
  # Remark Avaya IPT
  # permit udp <Avaya_voice_IPv4subnet> any range 2048 65535
  Remark Lync Voice
  permit udp any range 39000 39019 any range 49152 57500
  permit udp any range 39000 39019 any range 39000 39019
  permit udp any range 39100 39147 any range 39100 39147
  permit udp any range 39100 39147 any range 49152 57500
  permit tcp any range 39000 39019 any range 49152 57500
  permit tcp any range 39000 39019 any range 39000 39019
  permit tcp any range 39100 39147 any range 39100 39147
  permit tcp any range 39100 39147 any range 49152 57500
  permit udp any range 39000 39019 any eq 3478
  Remark MSTeams Voice
  permit udp any range 50000 50019 any range 50000 50019
  permit udp any range 50000 50019 any range 39000 39019
  permit udp any range 39000 39019 any range 50000 50019
  permit udp any range 50000 50019 any range 3478 3481
  permit udp any range 50000 50019 any range 49152 53247
  permit tcp any range 50000 50019 any range 50000 50019
  permit tcp any range 50000 50019 any range 39000 39019
  permit tcp any range 39000 39019 any range 50000 50019
  permit tcp any range 50000 50019 any range 49152 53247
  Remark SBC_TO_MS_Team_voice
  permit tcp any range 16384 32767 any range 49152 57500
  permit udp any range 16384 32767 any range 49152 57500
  permit tcp any range 39000 39019 any range 16384 32767
  permit udp any range 39000 39019 any range 16384 32767
  permit udp any range 16384 32767 any range 3478 3481
  permit tcp any range 16384 32767 any eq 443
!
ip access-list extended signaling-ipv4
  permit tcp any range 2000 2002 any
  permit tcp any any range 2000 2002
  permit tcp any range 5060 5061 any
  permit tcp any any range 5060 5061
  permit udp any range 5060 5061 any
  permit udp any any range 5060 5061
  permit tcp any range 1719 1720 any
  permit tcp any any range 1719 1720
  permit udp any range 1719 1720 any
  permit udp any any range 1719 1720
  remark SBC_TO_MS_Team_signal
  permit tcp any range 50000 50059 any eq 443
  permit tcp any eq 5061 any eq 5061
  permit tcp any eq 5060 any eq 5060
!
ip access-list extended videoconf-ipv4
  permit udp any range 3230 3342 any
  permit udp any range 2326 2487 any
  permit udp any any range 3230 3342
  permit udp any any range 2326 2487
  permit udp any range 16384 32767 any
  permit udp any any range 16384 32767
!
ip access-list extended gold-ipv4
  Remark Lync Video
  permit udp any range 39020 39039 any range 57501 65535
  permit udp any range 39020 39039 any range 39020 39039
  permit udp any range 39148 39195 any range 57501 65535
  permit udp any range 39148 39195 any range 39148 39195
  permit tcp any range 39020 39039 any range 57501 65535
  permit tcp any range 39020 39039 any range 39020 39039
  permit tcp any range 39148 39195 any range 57501 65535
  permit tcp any range 39148 39195 any range 39148 39195
  permit udp any range 39020 39039 any eq 3478
  Remark Jabber Video
  permit udp any range 21800 21900 any
  Remark Lync Desktop Share
  permit tcp any range 39040 39059 any range 39040 39059
  permit tcp any range 39040 39059 any range 49152 65535
  permit udp any range 39040 39059 any eq 3478
  Remark MSTeams Video
  permit udp any range 50020 50039 any range 50020 50039
  permit udp any range 50020 50039 any range 39020 39039
  permit udp any range 39020 39039 any range 50020 50039
  permit udp any range 50020 50039 any range 3478 3481
  permit tcp any range 50020 50039 any range 50020 50039
  permit tcp any range 50020 50039 any range 39020 39039
  permit tcp any range 39020 39039 any range 50020 50039
  Remark MSTeams Desktop Share
  permit udp any range 50040 50059 any range 50040 50059
  permit udp any range 50040 50059 any range 39040 39059
  permit udp any range 39040 39059 any range 50040 50059
  permit udp any range 50040 50059 any range 3478 3481
  permit tcp any range 50040 50059 any range 50040 50059
  permit tcp any range 50040 50059 any range 39040 39059
  permit tcp any range 39040 39059 any range 39040 39059
  Remark Management Traffic
  permit tcp any any eq 389
  permit udp any any eq 389
  permit tcp any eq 389 any
  permit udp any eq 389 any
  permit tcp any any eq 123
  permit udp any any eq ntp
  permit tcp any eq 123 any
  permit udp any eq ntp any
  permit tcp any eq domain any
  permit udp any eq domain any
  permit tcp any any eq domain
  permit udp any any eq domain
  permit udp any eq bootps any
  permit udp any any eq bootps
  permit udp any eq bootpc any
  permit udp any any eq bootpc
!
ip access-list extended local-management-ipv4
  permit tcp any any eq 22
  permit tcp any eq 22 any
!
ipv6 access-list voice-ipv6
  # Remark Cisco IPT
  # permit udp <Cisco_voice_IPv6subnet> any range 16384 32767
  # Remark Avaya IPT
  # permit udp <Avaya_voice_IPv6subnet> any range 2048 65535
  Remark Lync Voice
  permit udp any range 39000 39019 any range 49152 57500
  permit udp any range 39000 39019 any range 39000 39019
  permit udp any range 39100 39147 any range 39100 39147
  permit udp any range 39100 39147 any range 49152 57500
  permit tcp any range 39000 39019 any range 49152 57500
  permit tcp any range 39000 39019 any range 39000 39019
  permit tcp any range 39100 39147 any range 39100 39147
  permit tcp any range 39100 39147 any range 49152 57500
  permit udp any range 39000 39019 any eq 3478
  Remark MSTeams Voice
  permit udp any range 50000 50019 any range 50000 50019
  permit udp any range 50000 50019 any range 39000 39019
  permit udp any range 39000 39019 any range 50000 50019
  permit udp any range 50000 50019 any range 3478 3481
  permit udp any range 50000 50019 any range 49152 53247
  permit tcp any range 50000 50019 any range 50000 50019
  permit tcp any range 50000 50019 any range 39000 39019
  permit tcp any range 39000 39019 any range 50000 50019
  permit tcp any range 50000 50019 any range 49152 53247
  Remark SBC_TO_MS_Team_voice
  permit tcp any range 16384 32767 any range 49152 57500
  permit udp any range 16384 32767 any range 49152 57500
  permit tcp any range 39000 39019 any range 16384 32767
  permit udp any range 39000 39019 any range 16384 32767
  permit udp any range 16384 32767 any range 3478 3481
  permit tcp any range 16384 32767 any eq 443
!
ipv6 access-list signaling-ipv6
  permit tcp any range 2000 2002 any
  permit tcp any any range 2000 2002
  permit tcp any range 5060 5061 any
  permit tcp any any range 5060 5061
  permit udp any range 5060 5061 any
  permit udp any any range 5060 5061
  permit tcp any range 1719 1720 any
  permit tcp any any range 1719 1720
  permit udp any range 1719 1720 any
  permit udp any any range 1719 1720
  remark SBC_TO_MS_Team_signal
  permit tcp any range 50000 50059 any eq 443
  permit tcp any eq 5061 any eq 5061
  permit tcp any eq 5060 any eq 5060
!
ipv6 access-list gold-ipv6
  Remark Lync Video
  permit udp any range 39020 39039 any range 57501 65535
  permit udp any range 39020 39039 any range 39020 39039
  permit udp any range 39148 39195 any range 57501 65535
  permit udp any range 39148 39195 any range 39148 39195
  permit tcp any range 39020 39039 any range 57501 65535
  permit tcp any range 39020 39039 any range 39020 39039
  permit tcp any range 39148 39195 any range 57501 65535
  permit tcp any range 39148 39195 any range 39148 39195
  permit udp any range 39020 39039 any eq 3478
  Remark Jabber Video
  permit udp any range 21800 21900 any
  Remark Lync Desktop Share
  permit tcp any range 39040 39059 any range 39040 39059
  permit tcp any range 39040 39059 any range 49152 65535
  permit udp any range 39040 39059 any eq 3478
  Remark MSTeams Video
  permit udp any range 50020 50039 any range 50020 50039
  permit udp any range 50020 50039 any range 39020 39039
  permit udp any range 39020 39039 any range 50020 50039
  permit udp any range 50020 50039 any range 3478 3481
  permit tcp any range 50020 50039 any range 50020 50039
  permit tcp any range 50020 50039 any range 39020 39039
  permit tcp any range 39020 39039 any range 50020 50039
  Remark MSTeams Desktop Share
  permit udp any range 50040 50059 any range 50040 50059
  permit udp any range 50040 50059 any range 39040 39059
  permit udp any range 39040 39059 any range 50040 50059
  permit udp any range 50040 50059 any range 3478 3481
  permit tcp any range 50040 50059 any range 50040 50059
  permit tcp any range 50040 50059 any range 39040 39059
  permit tcp any range 39040 39059 any range 39040 39059
  Remark Management Traffic
  permit tcp any any eq 389
  permit udp any any eq 389
  permit tcp any eq 389 any
  permit udp any eq 389 any
  permit tcp any any eq 123
  permit udp any any eq ntp
  permit tcp any eq 123 any
  permit udp any eq ntp any
  permit tcp any eq domain any
  permit udp any eq domain any
  permit tcp any any eq domain
  permit udp any any eq domain
  permit udp any eq bootps any
  permit udp any any eq bootps
  permit udp any eq bootpc any
  permit udp any any eq bootpc
! 
ipv6 access-list videoconf-ipv6
 permit udp any range 3230 3342 any
 permit udp any range 2326 2487 any
 permit udp any any range 3230 3342
 permit udp any any range 2326 2487
 permit udp any range 16384 32767 any
 permit udp any any range 16384 32767
!
ipv6 access-list local-management-ipv6
 permit tcp any any eq 22
 permit tcp any eq 22 any
!
class-map match-any VOICE
 match access-group name voice-ipv4
 match access-group name voice-ipv6
!
class-map match-any PLATINUM
 match access-group name signaling-ipv4
 match access-group name signaling-ipv6
!
class-map match-any GOLD
 match access-group name gold-ipv4
 match access-group name gold-ipv6
! 
class-map match-any VIDEOCONF
 match access-group name videoconf-ipv4
 match access-group name videoconf-ipv6 
!
class-map match-any Voice-Video
 match dscp 46 
 match dscp 32 
 match dscp 34
class-map match-any Platinum
 match dscp 24 
 match dscp 26
 match dscp 48
 match dscp 56
class-map match-any Gold
 match dscp 16
 match dscp 18
!
policy-map VIDEOCONF-VLAN
  class VIDEOCONF
   set dscp cs4
  class PLATINUM
   set dscp cs3
  class class-default
   set dscp 0
!
policy-map VOICE-DATA-VLANS
 class VOICE
   set dscp ef
 class PLATINUM
   set dscp cs3
 class GOLD
   set dscp cs2
 class class-default
   set dscp 0
!
policy-map UPLINK-COS-1G
 class Voice-Video
  police 300000000 bc 3000000 conform-action transmit exceed-action drop
   priority level 1
 class Platinum
  bandwidth remaining percent 40
 class Gold
  bandwidth remaining percent 30
!
policy-map UPLINK-COS-10G
 class Voice-Video
  police 3000000000 bc 30000000 conform-action transmit exceed-action drop
   priority level 1
 class Platinum
  bandwidth remaining percent 40
 class Gold
  bandwidth remaining percent 30
!
route-map local-management permit 10 
  match ip address local-management-ipv4
  match ipv6 address local-management-ipv6
  set ip precedence 2
!
ip local policy route-map local-management
!
ip access-list extended SSH_MGMT
 10 remark #Chicago PIC#
 10 permit ip 10.15.128.0 0.0.63.255 any
 20 remark #CHC CIO Specific SSL VPN Range#
 20 permit ip 10.11.222.192 0.0.0.63 any
 30 remark #Washington PIC#
 30 permit ip 10.15.192.0 0.0.63.255 any
 40 remark #DCC CIO Specific SSL VPN Range#
 40 permit ip 10.88.224.64 0.0.0.63 any
 50 remark #London PIC#
 50 permit ip 10.142.0.0 0.0.63.255 any
 60 remark #LON CIO Specific SSL VPN Range#
 60 permit ip 10.100.68.128 0.0.0.63 any
 70 remark #Frankfurt PIC#
 70 permit ip 10.115.192.0 0.0.63.255 any
 80 remark #FRC CIO Specific SSL VPN Range#
 80 permit ip 10.102.83.0 0.0.0.63 any
 90 remark #Singapore PIC#
 90 permit ip 10.226.0.0 0.0.63.255 any
 100 remark #SGP CIO Specific SSL VPN Range#
 100 permit ip 10.252.9.0 0.0.0.63 any
 102 remark #HK CIO Specific SSL VPN Range#
 102 permit ip 10.246.186.64 0.0.0.63 any
 110 remark #DCC ACE Amazon Bastion Host Only#
 110 permit ip 10.147.0.0 0.0.255.255 any
 120 permit ip 10.69.0.0 0.0.255.255 any
 130 permit ip 10.85.0.0 0.0.255.255 any
 140 remark #CHC ACE MS Azure Bastion Host Only#
 140 permit ip 10.87.0.0 0.0.255.255 any
 150 remark #Sterling NTTA DC#
 150 permit ip 10.67.0.0 0.0.255.255 any
 160 remark #Sterling NTTA NCM Voyence#
 160 permit ip 170.252.17.198 0.0.0.1 any
 170 remark #Hof Bastion only#
 170 permit ip 10.134.0.0 0.0.255.255 any
 180 remark #Manila Bastion only#
 180 permit ip 10.213.0.0 0.0.255.255 any
 190 remark #prgdv1001_prgdv1020 GNOC DI owned#
 190 permit ip host 10.131.11.133 any
 200 permit ip host 10.131.11.220 any
 201 permit ip 10.115.218.56 0.0.0.3 any
 210 remark #Mumbai Bastion Host IP Ranges#
 210 permit ip 10.254.208.0 0.0.15.255 any
 220 permit ip 10.255.16.0 0.0.15.255 any
 230 permit ip 10.255.64.0 0.0.31.255 any
 1001 remark #HOP2HOP#
 1001 permit ip host 10.202.128.1 any
 1002 permit ip host 10.202.128.5 any
 1003 permit ip host 10.202.128.6 any
 1004 permit ip host 10.202.128.7 any
 1005 permit ip host 10.202.128.8 any
 1006 permit ip host 10.202.128.9 any
 1031 permit ip host 10.192.255.153 any
 1033 permit ip host 10.202.128.3 any
 2000 remark #Deny and Log any other sources users are trying to access from#
 2000 deny ip any any log
!
line con 0
 logging synchronous
 exec-timeout 10 0
line vty 0 9
 access-class SSH_MGMT in vrf-also
 session-timeout 10
 exec-timeout 10 0
 logging synchronous
 transport preferred ssh
 transport input ssh
 transport output ssh
line vty 10 15
 no exec
 exec-timeout 0 1
 no password
 transport preferred none
 transport input none
!
----interface starts----



  REGION: {{REGION}}
  COUNTRY: {{COUNTRY}}
  CITY: {{CITY}}
  BUILDING_CODE: {{get this "BUILDING CODE"}}
  VTP_DOMAIN_NAME: {{get this "VTP DOMAIN NAME"}}
  MANAGEMENT_VLAN_ID: {{get this "MANAGEMENT VLAN ID"}}
  TMP_VLAN_ID: {{get this "TMP VLAN ID (if needed)"}}
  DOMAIN: {{DOMAIN}}

I am Rohan Sangle
`;

const compileTemplate = (data) => {
  const template = Handlebars.compile(templateString);
  return template(data);
};

export default compileTemplate;

