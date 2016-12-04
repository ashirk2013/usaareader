// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.



function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function renderResults(dataArray) {
  var str = "";
  dataArray.forEach(function(row) {
    str = str.concat(row.date, '\t', row.desc, '\t', row.amount, '\n');
  });
  document.getElementById('transactions').textContent = str;
}

function readRequest() {
  console.log('   +++ inside readRequest()');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, {action: 'read'}, function handler(response) {
      console.log('   +++ got a response from the pageReader');
      if (response.status === 'good') {
        renderStatus('Transactions Read: ' + response.transactionCount);
        renderResults(response.tx);
      } else {
        renderStatus('Invalid Response');
      }
    });
  });
}





document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#readRequest').addEventListener(
    'click', readRequest);
});
