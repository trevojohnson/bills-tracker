fetch('data.json',{cache:'no-store'})
  .then(r=>r.json())
  .then(({bills=[],payments=[]})=>{
    const sumBills=bills.reduce((s,b)=>s+b.amount,0);
    const sumPays=payments.reduce((s,p)=>s+p.amount,0);
    document.getElementById('total').textContent=
      `You still owe: $${(sumBills-sumPays).toFixed(2)}`;

    const bT=document.querySelector('#bills tbody');
    bills.forEach(b=>{
      bT.insertRow().innerHTML=`<td>${b.name}</td><td>$${b.amount}</td>`;
    });

    const pT=document.querySelector('#pays tbody');
    payments.forEach(p=>{
      pT.insertRow().innerHTML=`<td>${p.date}</td><td>$${p.amount}</td>`;
    });
  })
  .catch(()=>document.getElementById('total').textContent='(data load error)');
