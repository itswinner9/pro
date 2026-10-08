# Quo on PlusPro

Public phone, SMS, and WhatsApp all use **(778) 655-8980** (`+17786558980`). The website talks to Quo over the REST API. Cursor and Claude talk to the same inbox over MCP. Do not put `QUO_API_KEY` in client JavaScript or in this repo.

## What the site does

1. Header, footer, `tel:`, `sms:`, WhatsApp, and local-business schema read `PHONE_NUMBER` from `lib/utils.ts`.
2. Quote, booking, and contact forms POST to `/api/leads`. That route emails the lead through Web3Forms, then (if `QUO_API_KEY` is set) creates a Quo contact, sends one confirmation SMS from `+17786558980`, and creates a follow-up task. If Quo fails after the email is sent, the form still succeeds.
3. `POST /api/quo/webhook` verifies the signed body and, for incoming missed or unanswered calls, texts: “Sorry we missed you — reply with the address and what’s broken, or book at pluspro.ca/book-service.”

Confirmation texts stay under 160 characters and are transactional only. Photo texts from customers arrive in the Quo app. The API cannot send MMS or place calls; the site keeps `tel:` links.

## Cloudflare secrets

In the **pluspro** Worker → **Settings** → **Variables and secrets**, add:

| Name | Notes |
| --- | --- |
| `QUO_API_KEY` | Raw API key. No `Bearer` prefix. |
| `QUO_PHONE_NUMBER_ID` | Optional `PN…` id. If omitted, the route looks up `+17786558980`. |
| `QUO_WEBHOOK_KEY` | `whsec_…` key returned when the call webhook is created. |
| `NEXT_PUBLIC_SITE_URL` | `https://pluspro.ca` |
| `WEB3FORMS_ACCESS_KEY` | Optional override for the contact form |

Confirm in Quo that **778-655-8980** can send SMS in Canada and that messaging credits are loaded.

## Missed-call webhook

After deploy, create a call webhook (once) with the API key:

```bash
curl -X POST https://api.quo.com/v1/webhooks/calls \
  -H "Authorization: $QUO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://pluspro.ca/api/quo/webhook",
    "events": ["call.completed"],
    "label": "PlusPro missed-call text-back",
    "status": "enabled"
  }'
```

Save the returned `key` as `QUO_WEBHOOK_KEY`. The route also accepts a later `call.missed` payload. It texts back only on incoming `missed`, `no-answer`, `abandoned`, or `unanswered` calls, and skips your own number.

## Quo MCP in Cursor

MCP is an operator tool in Cursor or Claude. It is not wired into the public site and does not use the API key.

1. Cursor **Settings** → **MCP** → add a remote server, or keep the project file [`.cursor/mcp.json`](.cursor/mcp.json).
2. URL must be exactly `https://mcp.quo.com/mcp` (the `/mcp` path is required).
3. Sign in with OAuth when Cursor prompts. Approve sends before they go out.

Useful prompts:

- “What calls did we miss yesterday, and who left a voicemail?”
- “Draft tomorrow’s appointment reminders and wait for my OK.”
- “Make a task on this missed call.”

Tools you will see after connecting: `list-inboxes`, `fetch-messages`, `fetch-missed-calls`, `fetch-call-transcripts`, `send-message`, `send-bulk-messages` (private, 2–40 people), `list-contacts`, `create-contact`, `update-contact`, `list-tasks`, `create-task`, `update-task`. Avoid `send-group-message` for customers (shared thread). Call summaries and transcripts need Quo Business or Scale.
