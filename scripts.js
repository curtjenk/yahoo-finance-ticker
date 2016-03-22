$(document).ready(function() {

    //Initialize FooTable.
    // a self invoking function
    $(function() {
        $('.footable').footable({});
    });
    //---------------

    $('#ticker-search').submit(function() {
        event.preventDefault(); //don't let the form submit
        var ticker = $('#symbol').val();
        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + ticker + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
        $.getJSON(url, showResults);
        // console.log(url);

    });

    $("#page-size").bind('change', function(e) {
        var value = $(this).val();
        $('table').attr('data-page-size', value);
        $('.footable').removeClass('footable-loaded');
        $('.footable').trigger('footable_redraw'); //force a redraw
        $('.footable').trigger('footable_initialize');
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

    $('#ticker-body').html(newHtml).trigger('footable_redraw');

    colorize();
}

function infoToHtml(item) {

    var newHtml = '<tr><td>' + item.Symbol + '</td>';
    newHtml += '<td>' + item.Name + '</td>';
    newHtml += '<td>' + item.Ask + '</td>';
    newHtml += '<td class="add-color numeric">' + item.Change + '</td>';
    newHtml += '<td>' + item.DaysHigh + '</td></tr>';
    return newHtml;
}

function colorize() {
    var toColorize = $('.add-color');
    $('.add-color').each(function(index) {
        var contents = $(this).html();
        if ($(this).hasClass('numeric')) {
            if (!isNaN(contents)) {
                if (contents > 0) {
                    $(this).addClass('green');
                } else if (contents < 0) {
                    $(this).addClass('red');
                }
            }
        } //else check for some other type

    });
}