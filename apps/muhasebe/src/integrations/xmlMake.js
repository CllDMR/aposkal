import { Invoice } from "ubl-builder";

// const { Invoice } = require('ubl-builder');
const invoice = new Invoice("1234", {});

invoice.addProperty(
  "xmlns",
  "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
);
invoice.addProperty("key", "value");

const xmlAsString = invoice.getXml(true);

console.log(xmlAsString);

/*

<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" key="value">
  <cbc:UBLVersionID>UBL 2.1</cbc:UBLVersionID>
  <cbc:ID>1234</cbc:ID>
  <cbc:IssueDate>2024-01-01</cbc:IssueDate>
  <cbc:IssueTime>12:04:01-05:00</cbc:IssueTime>
</Invoice>

*/
