# App Studio Third-Party Connector Strategy

This document proposes third-party connectors for App Studio based on the 200 SME internal application ideas in `sme-embedded-app-prompts.md`.

## Recommendation

Build a shared connector platform before adding many provider-specific integrations.

Start with:

1. HitPay Payment API
2. HitPay Commerce API
3. Google Workspace
4. Microsoft 365
5. WhatsApp Business
6. Transactional email
7. Generic REST API and webhooks
8. CSV, Excel, and SFTP

OAuth credentials, API keys, refresh tokens, and webhook secrets should be managed by App Studio. Generated applications should access providers through the App Studio connector API and must not store provider credentials inside their source code or databases.

## Phase 1: Platform Foundation

### HitPay Payment API

- Authentication: OAuth 2.0 preferred; Business API Key for direct connections
- Capabilities:
  - Payment requests and payment links
  - Charges and payment status
  - Refunds
  - Payouts and balances
  - Recurring billing
  - Invoices
  - Payment reconciliation
- Relevant prompts: 1–10, 25, 28–30, 40, 93–96, and 111–120
- Documentation:
  - [HitPay OAuth](https://docs.hitpayapp.com/platforms/oauth)
  - [HitPay Platform API](https://docs.hitpayapp.com/apis/guide/platform-apis)
  - [HitPay API events and webhooks](https://docs.hitpayapp.com/apis/guide/events)

### HitPay Commerce API

- Authentication: OAuth 2.0 or HitPay business credentials, depending on the available Commerce endpoint
- Capabilities:
  - Products, variants, and categories
  - Customers
  - Orders
  - Inventory and stock by location
  - Online store and POS commerce records
  - Returns, order cancellation, and fulfillment
  - Commerce sales analytics
- Relevant prompts: 11–30, 40, 93, and 106–110
- Documentation:
  - [HitPay products](https://docs.hitpayapp.com/store/products)
  - [HitPay orders](https://docs.hitpayapp.com/store/orders)
  - [HitPay POS products and inventory](https://docs.hitpayapp.com/pos/products-categories)
  - [HitPay API events and order webhooks](https://docs.hitpayapp.com/apis/guide/events)

Payment and Commerce should be exposed as separate connector capabilities even if they share one HitPay OAuth connection. An application can request only `hitpay.payment` or `hitpay.commerce` permissions according to its needs.

### Google Workspace

- Authentication: OAuth 2.0 authorization code flow
- Capabilities:
  - Google Calendar
  - Gmail
  - Google Drive
  - Google Sheets
- Relevant prompts: 7–10, 34, 46–58, 71–80, and 101–109
- Documentation:
  - [Google Workspace authentication](https://developers.google.com/workspace/guides/auth-overview)
  - [Google Calendar authorization scopes](https://developers.google.com/workspace/calendar/api/auth)

### Microsoft 365

- Authentication: Microsoft OAuth 2.0 through MSAL
- Capabilities:
  - Outlook Calendar and Mail
  - OneDrive
  - SharePoint
  - Microsoft Teams
- Documentation:
  - [Microsoft Graph authentication](https://learn.microsoft.com/en-us/graph/auth/auth-concepts)

### WhatsApp Business

- Authentication: Meta OAuth or System User Bearer token
- Capabilities:
  - Customer reminders
  - Support conversations
  - Collections
  - Booking confirmations
  - Delivery updates
- Relevant prompts: 6, 23–26, 34, 39–50, and 71–79
- Documentation:
  - [WhatsApp Business Platform](https://developers.facebook.com/documentation/business-messaging/whatsapp/overview)

### Transactional Email

- Candidate providers: Postmark, Amazon SES, SendGrid, or Resend
- Authentication: API key
- Capabilities:
  - Approval notifications
  - Escalations
  - Receipts
  - Reports
  - Customer reminders

### Generic REST API and Webhooks

- Authentication:
  - OAuth 2.0
  - API key
  - Bearer token
  - Basic Authentication
  - Custom headers
- Capabilities:
  - Connect merchant-specific systems
  - Receive inbound webhook events
  - Send outbound webhook events
  - Configure custom actions and field mappings

### CSV, Excel, and SFTP

- Authentication: SFTP or storage credentials
- Capabilities:
  - Legacy accounting integration
  - Bulk import and export
  - Scheduled data exchange
- Relevant prompts: 4, 9, 20, 93–100, 120–124, 136, and 146–150

## Phase 2: High-Reuse Connectors

### Accounting

Initial providers:

- Xero
- QuickBooks Online

Use cases:

- Bills and expenses
- Invoices and payment status
- Budget tracking
- Financial closing
- Tax preparation

Documentation:

- [Xero OAuth 2.0](https://developer.xero.com/documentation/guides/oauth2/overview/)
- [QuickBooks authentication](https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization)

### CRM

Candidate providers:

- HubSpot
- Salesforce
- Zoho CRM

Use cases:

- Contacts and companies
- Leads and opportunities
- Activities
- Sales pipeline
- Account health

Documentation:

- [HubSpot OAuth](https://developers.hubspot.com/docs/apps/legacy-apps/authentication/oauth-quickstart-guide)

### Team Messaging

Candidate providers:

- Slack
- Microsoft Teams

Use cases:

- Approval notifications
- Escalations
- Incident alerts
- Operational notifications

Documentation:

- [Slack OAuth](https://docs.slack.dev/authentication/installing-with-oauth)
- [Microsoft Graph authentication](https://learn.microsoft.com/en-us/graph/auth/auth-concepts)

### Maps and Routing

Candidate providers:

- Google Maps Platform
- Mapbox

Use cases:

- Geocoding
- Route planning
- Travel distance and time
- Service zones
- Field worker locations

Documentation:

- [Google Maps getting started](https://developers.google.com/maps/get-started)
- [Google Maps API key security](https://developers.google.com/maps/api-security-best-practices)

### File Storage

Candidate providers:

- Google Drive
- OneDrive and SharePoint
- Amazon S3-compatible storage

Use cases:

- Evidence and photos
- Contracts
- Certificates
- Report exports
- Document attachments

### Electronic Signature

Candidate providers:

- DocuSign
- Dropbox Sign

Use cases:

- Contract signing
- Approval signatures
- Consent
- Acknowledgements
- Signing order

Documentation:

- [DocuSign authentication](https://developers.docusign.com/platform/auth/)
- [Dropbox Sign OAuth](https://developers.hellosign.com/api/oauthWalkthrough/)

### Customer Support

Candidate providers:

- Zendesk
- Freshdesk

Use cases:

- Tickets
- SLA tracking
- Escalation
- Customer timelines

Documentation:

- [Zendesk OAuth](https://developer.zendesk.com/documentation/ticketing/working-with-oauth/)
- [Freshdesk API](https://developers.freshdesk.com/api/)

## Phase 3: Vertical and Enterprise Connectors

### Logistics and Carriers

Candidate providers:

- DHL
- Ninja Van
- J&T Express
- SingPost

Use cases:

- Shipping labels
- Pickup requests
- Shipment tracking
- Proof of delivery
- Claims

Documentation:

- [DHL Developer Portal](https://developer.dhl.com/)

### Marketplaces

Candidate providers:

- Lazada
- Shopee
- Amazon

These connectors are only needed when a merchant needs to synchronize an external marketplace with HitPay Commerce. HitPay remains the primary commerce system for App Studio.

Use cases:

- Import marketplace orders
- Synchronize listings
- Synchronize price and stock

### HR and Payroll

Candidate providers:

- Employment Hero
- Talenox
- HReasily
- Deputy

Use cases:

- Employee records
- Leave
- Shifts
- Attendance
- Payroll preparation

API availability and partner requirements should be verified before selecting the initial providers.

### Video Meetings

Candidate providers:

- Zoom
- Google Meet
- Microsoft Teams

Use cases:

- Appointments
- Classes
- Interviews
- Attendance

### Forms and Surveys

Candidate providers:

- Typeform
- Jotform
- SurveyMonkey

Use cases:

- Lead capture
- Feedback
- NPS
- Intake forms
- Questionnaires

### Workflow Automation

Candidate providers:

- Zapier
- Make
- n8n

Use this category as an escape hatch for long-tail workflows that do not justify a native connector.

### Singapore E-Invoicing

- Integration: InvoiceNow/Peppol through an approved access-point provider
- Use cases:
  - Compliant invoice delivery
  - Invoice status exchange
  - Accounting reconciliation

### ERP

Candidate providers:

- NetSuite
- Microsoft Dynamics 365
- SAP Business One

Use cases:

- Finance
- Supply chain
- Inventory
- Procurement
- Multi-entity operations

## Authentication Policy

### Use OAuth 2.0 when:

- A merchant connects their own third-party account.
- The provider supports delegated access.
- Access needs granular scopes.
- Merchants need to revoke access independently.
- App Studio serves multiple businesses.

### Use an API key when:

- The provider does not support delegated OAuth.
- The integration belongs to one business.
- The key can be restricted by API, domain, IP address, or permissions.

### Never:

- Store provider secrets in generated application source code.
- Expose refresh tokens to the browser.
- Share one merchant credential across businesses.
- Request broader OAuth scopes than the application needs.

## Connector Control Plane

App Studio should provide:

1. OAuth connection manager
2. Encrypted credential vault
3. Webhook gateway with signature verification
4. Tenant-aware event routing
5. Webhook deduplication and replay
6. Background job runner
7. Rate-limit handling and exponential retries
8. Dead-letter queue
9. Cursor-based incremental synchronization
10. Connection health and sync status
11. Audit logs
12. Canonical data contracts and provider field mappings

Suggested connector interface:

```ts
interface Connector {
  connect(): Promise<Connection>
  testConnection(): Promise<ConnectionStatus>
  subscribeWebhooks(): Promise<void>
  pull(cursor?: string): Promise<PullResult>
  push(records: ConnectorRecord[]): Promise<PushResult>
  execute(action: ConnectorAction): Promise<ActionResult>
  disconnect(): Promise<void>
}
```

Connections should be owned at the business level. Generated applications request connector capabilities and scopes, while App Studio owns credentials, authorization, auditing, and revocation.

## Suggested Rollout

### 0–3 months

- Connector SDK
- OAuth credential vault
- Webhook gateway
- Background connector jobs
- HitPay Payment
- HitPay Commerce
- Google Calendar and Drive
- Transactional email
- Generic REST API and webhooks

### 3–6 months

- Microsoft 365
- WhatsApp Business
- Xero
- Slack and Microsoft Teams
- Google Maps
- Connection health dashboard
- Webhook replay

### 6–12 months

- CRM
- Customer support
- Logistics
- Electronic signature
- HR and payroll
- InvoiceNow

Consider a unified API provider only when the required connector breadth exceeds the team's capacity to maintain direct integrations.

## Validation

The prompt ranges in this document indicate qualitative relevance, not measured customer demand. Validate priorities using:

- Merchant interviews
- Connector request frequency
- Active App Studio use cases
- Provider API maturity
- Partner and approval requirements
- Implementation and maintenance cost

## Third-Party Integration Summary

| Integration | Category | Authentication | Main use | Priority | Documentation |
| --- | --- | --- | --- | --- | --- |
| HitPay Payment | Payment | OAuth 2.0 / API Key | Payments, refunds, payouts, subscriptions, and invoices | Phase 1 | [OAuth](https://docs.hitpayapp.com/platforms/oauth) · [Platform API](https://docs.hitpayapp.com/apis/guide/platform-apis) |
| HitPay Commerce | Commerce | Shared HitPay OAuth / business credentials | Products, orders, customers, inventory, POS, and fulfillment | Phase 1 | [Products](https://docs.hitpayapp.com/store/products) · [Orders](https://docs.hitpayapp.com/store/orders) |
| Google Workspace | Productivity | OAuth 2.0 | Calendar, Gmail, Drive, and Sheets | Phase 1 | [Authentication](https://developers.google.com/workspace/guides/auth-overview) |
| Microsoft 365 | Productivity | OAuth 2.0 / MSAL | Outlook, Calendar, OneDrive, SharePoint, and Teams | Phase 1 | [Microsoft Graph auth](https://learn.microsoft.com/en-us/graph/auth/auth-concepts) |
| WhatsApp Business | Messaging | Meta OAuth / System User token | Customer messaging, reminders, and notifications | Phase 1 | [Platform docs](https://developers.facebook.com/documentation/business-messaging/whatsapp/overview) |
| Postmark / SES / SendGrid / Resend | Email | API Key | Transactional email and reports | Phase 1 | Provider-specific |
| Generic REST API | Custom integration | OAuth 2.0 / API Key / Bearer / Basic | Connect merchant-specific systems | Phase 1 | Defined by connected provider |
| Generic Webhooks | Custom integration | Signature / shared secret | Inbound and outbound events | Phase 1 | Defined by connected provider |
| CSV / Excel / SFTP | File exchange | SFTP or storage credentials | Legacy imports, exports, and scheduled exchange | Phase 1 | Protocol-based |
| Xero | Accounting | OAuth 2.0 | Contacts, invoices, bills, expenses, and reconciliation | Phase 2 | [OAuth 2.0](https://developer.xero.com/documentation/guides/oauth2/overview/) |
| QuickBooks Online | Accounting | OAuth 2.0 | Customers, invoices, expenses, and accounting records | Phase 2 | [Authentication](https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization) |
| HubSpot | CRM | OAuth 2.0 | Contacts, companies, leads, deals, and activities | Phase 2 | [OAuth](https://developers.hubspot.com/docs/apps/legacy-apps/authentication/oauth-quickstart-guide) |
| Salesforce | CRM | OAuth 2.0 | Leads, opportunities, accounts, and custom objects | Phase 3 | [OAuth](https://help.salesforce.com/s/articleView?id=xcloud.remoteaccess_oauth_flows.htm&type=5) |
| Zoho CRM | CRM | OAuth 2.0 | Leads, contacts, deals, and activities | Phase 3 | [OAuth](https://www.zoho.com/crm/developer/docs/api/v8/oauth-overview.html) |
| Slack | Team messaging | OAuth 2.0 | Notifications, approvals, alerts, and commands | Phase 2 | [OAuth](https://docs.slack.dev/authentication/installing-with-oauth) |
| Google Maps Platform | Maps and routing | Restricted API Key | Geocoding, routing, distance, and locations | Phase 2 | [Get started](https://developers.google.com/maps/get-started) |
| Mapbox | Maps and routing | Access Token | Maps, geocoding, navigation, and routing | Phase 3 | [Access tokens](https://docs.mapbox.com/help/getting-started/access-tokens/) |
| Google Drive | File storage | OAuth 2.0 | Documents, evidence, attachments, and exports | Phase 2 | [Drive API](https://developers.google.com/drive/api/guides/about-sdk) |
| OneDrive / SharePoint | File storage | OAuth 2.0 / Microsoft Graph | Documents, attachments, and shared business files | Phase 2 | [Microsoft Graph auth](https://learn.microsoft.com/en-us/graph/auth/auth-concepts) |
| Amazon S3-compatible storage | File storage | Access Key / signed request | Files, images, evidence, and exports | Phase 2 | [S3 API](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html) |
| DocuSign | Electronic signature | OAuth 2.0 / JWT Grant | Contracts, consent, and signatures | Phase 2 | [Authentication](https://developers.docusign.com/platform/auth/) |
| Dropbox Sign | Electronic signature | OAuth 2.0 / API Key | Contracts, approvals, and signatures | Phase 2 | [OAuth](https://developers.hellosign.com/api/oauthWalkthrough/) |
| Zendesk | Customer support | OAuth 2.0 / API Token | Tickets, SLA, escalation, and customer history | Phase 2 | [OAuth](https://developer.zendesk.com/documentation/ticketing/working-with-oauth/) |
| Freshdesk | Customer support | API Key | Tickets, SLA, agents, and customer history | Phase 2 | [API](https://developers.freshdesk.com/api/) |
| DHL | Logistics | API Key | Shipping rates, labels, tracking, and pickup | Phase 3 | [Developer portal](https://developer.dhl.com/) |
| Ninja Van / J&T Express / SingPost | Logistics | API Key / partner credentials | Labels, pickup, tracking, and proof of delivery | Phase 3 | Provider or partner access |
| Lazada / Shopee / Amazon | Marketplace | OAuth / seller authorization | External marketplace orders, listings, and stock | Phase 3 | Marketplace-specific |
| Employment Hero / Talenox / HReasily / Deputy | HR and payroll | OAuth / API Key / partner access | Employees, leave, attendance, shifts, and payroll | Phase 3 | Verify provider API and partnership |
| Zoom | Video meeting | OAuth 2.0 / Server-to-Server OAuth | Meetings, appointments, interviews, and attendance | Phase 3 | [OAuth](https://developers.zoom.us/docs/integrations/oauth/) |
| Typeform / Jotform / SurveyMonkey | Forms and surveys | OAuth 2.0 / API Token | Intake, feedback, questionnaires, and NPS | Phase 3 | Provider-specific |
| Zapier / Make / n8n | Automation | OAuth / API Key / Webhook | Long-tail workflow automation | Phase 3 | Platform-specific |
| InvoiceNow / Peppol provider | E-invoicing | Provider credentials | Compliant invoice delivery and status exchange | Phase 3 | Selected access-point provider |
| NetSuite / Dynamics 365 / SAP Business One | ERP | OAuth / proprietary credentials | Finance, supply chain, inventory, and procurement | Phase 3 | Provider-specific |
