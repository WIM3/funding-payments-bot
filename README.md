# Funding Payments Bot

- Install packages using `yarn`
- See `package.json` for all the options you can run it with

### Parameters

Some parameters can be set directly in `serverless.yml`:

- `CLEARING_HOURSE` - clearing house address (required)

The remaining parameters are private and they are therefore taken from `AWS Parameter Store` with these paths:

```
/infinix/[ENVIRONMENT]/funding-payments-bot/walletPk
/infinix/[ENVIRONMENT]/funding-payments-bot/providerUrl
```
