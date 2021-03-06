# Debtors List 

## Information

To run locally as developer please start two separated bash instances.

First instance (Server)
 - `cd server && npm install && npm run start`
 - this will start server on port 3000 which will power the API
   - if you have `process.env.PORT` set to something else, it will use that port but then you need to update
     manually `proxy` field in `frontend/package.json`.
   - API is mocked and on each server restart values will change, however any changes in frontend will be correctly
     tracked by backend during one session.

Second instance (Frontend)
 - `cd frontend && npm install && npm run start`
 - this will start React frontend
   - since port `3000` will most likely be taken by server, it will offer you to start on `3001` and then
      all axios requests will automatically use proxy to port `3000`.
 
 Test of modal component 
  - `cd frontend && npm install && npm run test`

## Assignment
Create a simple (React) SPA that displays a list of debtors.

The list should display the following: `Debtor Name`, `Date of first purchase`, `Amount (maximum amount)`, `Used 
amount`, `Remaining amount`.

The amounts must be displayed in the german format, with 2 decimals.  
The debtors should be fetched from an endpoint, that will provide the data in this format (add as
many as needed):

```
[{ id: 1, name: "Musterfirma", amount: 10000.0000, amountLeft: 4500.0000, dateOfFirstPurchase: “2019-07-07” },
 { id: 2, name: "Some Company Inc.", amount: 10000.0000, amountLeft: 4327.7265, dateOfFirstPurchase: “2019-07-07”}]
```

The endpoint itself can be mocked.

Clicking on the debtor row should open a modal with the debtor’s name and one input field:
- The field is pre-filled with the maximum amount for the debtor.
- The user should be able to edit the value and submit.
- If the value is not valid, no submission should be possible.
- If the value is valid, a confirmation should be displayed before the user can go back to
the list of debtors.  

The new value should appear in the list as soon as it is updated.
**Bonus**: The value must not be less than the used amount.

Cover the modal component with tests.  

Notes:
- On the frontend side, all the numeric values must have two decimals, and be displayed in the
german locale.
- it is up to you to use create-react-app;
- it is possible to use redux
- it is up to you to use any CSS framework, or no framework at all.
