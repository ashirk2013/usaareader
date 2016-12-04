var transactionList = [];


console.log('   +++ loaded pageReader');
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request && request.action === 'read') {
      console.log('   +++ going to read transactions');
      transactionList = [];
      readTransactions(sendResponse);
      return true;
    } else {
      console.log('   +++ did not understand request');
      sendResponse({status: 'bad', transactionCount: 0});
    }

  });


function readTransactions(sendResponse) {
  var el = document.querySelectorAll('tbody.yui-dt-data');
  var tnodes;

  if (!el) {
    return;
  }

  el = el[0];
  if (!el) {
    return;
  }

  tnodes = el.childNodes;

  if (tnodes && tnodes.length >= 1) {
    tnodes.forEach(function(tx) {
      var columns = tx.childNodes;
      if (columns && columns.length === 6) {
        var date = columns[1].innerText.trim();
        var desc = columns[2].innerText.trim();
        var amount = columns[4].innerText.trim();
        transactionList.push({
          date: date,
          desc: desc,
          amount: amount
        });
      }
    });
    return sendResponse(
      {
        status: 'good',
        transactionCount: transactionList.length,
        tx: transactionList
      });
  } // end if
} // end function
