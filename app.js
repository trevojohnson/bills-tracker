/* app.js  – Bills tracker
   Displays “total owed” as ONLY the sum of UNPAID bills.
   Payments are still shown in their own table, but they no longer
   affect the big number at the top.                                */

fetch('data.json', { cache: 'no-store' })          // always pull the latest commit
  .then(r => r.json())
  .then(({ bills = [], payments = [] }) => {

    /* ---------- 1. Compute total owed (bills only) ---------- */
    const sumBills = bills.reduce((total, bill) => total + bill.amount, 0);

    /* ---------- 2. Update the giant counter ---------- */
    document.getElementById('total').textContent =
      `You still owe: $${sumBills.toFixed(2)}`;

    /* ---------- 3. Render the “Unpaid Bills” table ---------- */
    const billsT = document.querySelector('#bills tbody');
    billsT.innerHTML = '';                        // clear previous rows
    bills.forEach(bill => {
      billsT.insertRow().innerHTML =
        `<td>${bill.name}</td><td>$${bill.amount}</td>`;
    });

    /* ---------- 4. Render the “Payments Made” table ---------- */
    const paysT = document.querySelector('#pays tbody');
    paysT.innerHTML = '';
    payments.forEach(pay => {
      paysT.insertRow().innerHTML =
        `<td>${pay.date}</td><td>$${pay.amount}</td>`;
    });

  })
  .catch(() => {
    // fallback if the fetch fails or JSON is malformed
    document.getElementById('total').textContent = '(data load error)';
  });
