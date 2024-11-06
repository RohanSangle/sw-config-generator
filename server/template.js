import Handlebars from 'handlebars';

Handlebars.registerHelper('get', function (obj, key) {
    return obj[key];  // Return the value of the object property based on the key
});

const templateString = `
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

