$(document).ready(function() {


    //---------------

    $('#ticker-search').submit(function() {
        event.preventDefault(); //don't let the form submit
        var ticker = $('#symbol').val();
        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + ticker + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
        $.getJSON(url, showResults);
        // console.log(url);

    });
});

function showResults(data) {

    var count = data.query.count;
    var stockInfo = data.query.results.quote;
    var newHtml;
    if (count > 1) {
        for (i = 0; i < count; i++) {
            newHtml += infoToHtml(stockInfo[i]);
        }
    } else {
        newHtml += infoToHtml(stockInfo);
    }

    $('#ticker-body').html(newHtml);
    //Initialize FooTable.
    // a self invoking function
    $(function() {
        $('.footable').footable({});
    });
}

function infoToHtml(item) {

    var newHtml = '<tr><td>' + item.Symbol + '</td>';
    newHtml += '<td>' + item.Name + '</td>';
    newHtml += '<td>' + item.Ask + '</td>';
    if (item.Change > 0) {
        newHtml += '<td class="green">' + item.Change + '</td>';
    } else {
        newHtml += '<td class="red">' + item.Change + '</td>';
    }

    newHtml += '<td>' + item.DaysHigh + '</td></tr>';
    return newHtml;
}