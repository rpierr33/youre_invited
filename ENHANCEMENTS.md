# Product Enhancements

## Gmail and CRM synchronization

Status: Deferred until the outreach process has an established baseline and is generating interest.

The CRM remains the source of truth for tracking leads, outreach dates, responses, follow-ups, next actions, and notes. Email continues through Gmail for now.

Before enabling Gmail inside the CRM, the integration must be proven end to end with:

- Google OAuth authorization and secure token renewal
- Sending from the correct Gmail account
- Scheduled delivery, retries, and visible failure states
- Reply matching without duplicates
- Bounce and unsubscribe handling
- Complete activity history on the correct lead
- Recovery when Gmail access is interrupted

The integration should not replace the current workflow until these behaviors pass production-like testing.
