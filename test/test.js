/* TODO: refactoring */

var $body = $('body');

$body.prepend($('<h1/>').text('jQuery: ' + jQuery.prototype.jquery));

$body.append('<input id="input" type="text" value="あいうえお かきくけこ さしすせそ">');
$body.append('<textarea id="textarea">あいうえお\nかきくけこさしすせそ\n<h1>たちつてと</h1></textarea>');

var $input = $('#input');
var $textarea = $('#textarea');

// IEでは改行コードが \r\n で処理されるため、
// value 値を直接取らないと期待した通りに動かない
// (val() で取ると改行コードが \n になる)
var strInput = $input[0].value;
var strTextarea = $textarea[0].value;

module('$.fn.selection');

test('getPos/get Test', function () {
    var $target, str;

    expect(8);

    $target = $input;
    str = strInput;

    deepEqual($target.selection('getPos'), {start: 0, end: 0});
    equal($target.selection('get'), '');

    $target.val(str).focus().select();
    deepEqual($target.selection('getPos'), {start: 0, end: str.length});
    equal($target.selection('get'), str);


    $target = $textarea;
    str = strTextarea;

    deepEqual($target.selection('getPos'), {start: 0, end: 0});
    equal($target.selection('get'), '');

    $target.val(str).focus().select();
    deepEqual($target.selection('getPos'), {start: 0, end: str.length});
    equal($target.selection('get'), str);
});

test('setPos/get Test', function () {
    var $target, str;
    var start, end;

    expect(8);

    $target = $input;
    str = strInput;

    start = 0;
    end = 7;
    $target.val(str).focus().selection('setPos', {start: start, end: end});
    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end - start));

    start = 5;
    end = str.length;
    $target.val(str).focus().selection('setPos', {start: start, end: end});
    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end - start));


    $target = $textarea;
    str = strTextarea;

    start = 0;
    end = 10;
    $target.val(str).focus().selection('setPos', {start: start, end: end});
    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end - start));

    start = 10;
    end = str.length;
    $target.val(str).focus().selection('setPos', {start: start, end: end});
    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end - start));
});

test('replace Test', function () {
    var $target, str;
    var start, end, replace;

    expect(36);

    $target = $input;
    str = strInput;

    replace = 'こんにちは！世界！';
    start = 0;
    end = 7;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'keep'});

    deepEqual($target.selection('getPos'), {start: start, end: start + replace.length});
    equal($target.selection('get'), replace);
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'start'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'end'});

    deepEqual($target.selection('getPos'), {start: start + replace.length, end: start + replace.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));


    start = 5;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'keep'});

    deepEqual($target.selection('getPos'), {start: start, end: start + replace.length});
    equal($target.selection('get'), replace);
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'start'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'end'});

    deepEqual($target.selection('getPos'), {start: start + replace.length, end: start + replace.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));


    $target = $textarea;
    str = strTextarea;

    replace = 'こんにちは';
    start = 0;
    end = 10;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'keep'});

    deepEqual($target.selection('getPos'), {start: start, end: start + replace.length});
    equal($target.selection('get'), replace);
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'start'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'end'});

    deepEqual($target.selection('getPos'), {start: start + replace.length, end: start + replace.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));


    start = 10;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'keep'});

    deepEqual($target.selection('getPos'), {start: start, end: start + replace.length});
    equal($target.selection('get'), replace);
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'start'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'end'});

    deepEqual($target.selection('getPos'), {start: start + replace.length, end: start + replace.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));
});

test('insert(before) Test', function () {
    var $target, str;
    var start, end, insert;

    expect(36);

    $target = $input;
    str = strInput;

    insert = 'こんにちは！世界！';
    start = 0;
    end = 7;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: end + insert.length});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: start + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: end + insert.length, end: end + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));


    start = 5;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: end + insert.length});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: start + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: end + insert.length, end: end + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));


    $target = $textarea;
    str = strTextarea;

    insert = 'こんにちは';
    start = 0;
    end = 10;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: end + insert.length});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: start + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: end + insert.length, end: end + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));


    start = 10;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: end + insert.length});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: start + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: end + insert.length, end: end + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));
});

test('insert(after) Test', function () {
    var $target, str;
    var start, end, insert;

    expect(36);

    $target = $input;
    str = strInput;

    insert = 'こんにちは！世界！';
    start = 0;
    end = 7;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: end, end: end});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));


    start = 5;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: end, end: end});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));


    $target = $textarea;
    str = strTextarea;

    insert = 'こんにちは';
    start = 0;
    end = 10;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: end, end: end});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));


    start = 10;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: end, end: end});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));
});

var targets = [$textarea, $input];
test('whitespace - no change if no selection', function() {
    expect(2);
    targets.forEach(function($target) {
        $target.selection('setPos', {start: 0, end: 0});
        $target.selection('trim');

        deepEqual($target.selection('getPos'), {start: 0, end: 0});
    });
});

test('whitespace - before and after text', function() {
    tests = [
        // tb & ta = text before the selection, text after the selection
        // wb & wa = whitespace before the text and inside the selection. Likewise for after.
        {wb: "", wa: ""},

        // Insert whitespace at the start of the selection
        {wb: " "},
        {wb: "     "},
        {wb: "\t"},
        {wb: "\n"},
        {wb: "\n\n"},
        {wb: "\r\n"},
        {wb: "\r\n\r\n"},

        // Insert whitespace at the end of the selection
        {wa: " " },
        {wa: "   "},
        {wa: "\t"},
        {wa: " \t"},
        {wa: "\n"},
        {wa: "\n\n"},
        {wa: "\r\n"},
        {wa: "\r\n\r\n"},   

        // Text before the selection, and whitespace at start of selection
        {tb: "hello", wb: " "},
        {tb: "hello", wb: "  "},
        {tb: "hello", wb: "\t"},
        {tb: "hello", wb: "\n"},
        {tb: "hello", wb: "\r\n"},

        // Text after the selection, and whitespace and end of selection
        {wa: " ", ta: "good bye"},
        {wa: "   ", ta: "good bye"},
        {wa: "\t", ta: "good bye"},
        {wa: "\n", ta: "good bye"},
        {wa: "\r\n", ta: "good bye"},

        // Text & whitespace, both before and after
        {tb: "hello", wb: " ",    wa: "\n", ta: "good bye"},
        {tb: "hello", wb: "  ",   wa: "   ", ta: "good bye"},
        {tb: "hello", wb: "\t",   wa: "\t",  ta: "good bye"},
        {tb: "hello", wb: "\n",   wa: " ", ta: "good bye"},
        {tb: "hello", wb: "\r\n", wa: "\r\n", ta: "good bye"},        
    ].map(function(testCase) {
        // Fill in missing values
        return {
            tb: testCase.tb || "",
            wb: testCase.wb || "",
            wa: testCase.wa || "",
            ta: testCase.ta || "",
        };
    });

    var quoteNewlines = function(str) {
        return str
            .replace("\n", "\\n")
            .replace("\r", "\\r");
    }
    var isInternetExplorer = window.navigator.userAgent.toLowerCase().indexOf("msie") >= 0

    if (isInternetExplorer) {
        // @@@ Figure out how many tests would run on IE
    }
    else {
        expect(120);
    }

    targets.forEach(function($target) {
        var oldValue = $target.val();

        tests.forEach(function(testCase) {
            // Only test for Windows-style newlines on IE
            var containsWindowsNewlines =            
                /\r/.test(testCase.wb) || /\r/.test(testCase.wa);
            if (containsWindowsNewlines && !isInternetExplorer) {
                return;
            }

            // Only test for newlines if we're testing a textarea
            var containsNewlines = containsWindowsNewlines ||
                /\n/.test(testCase.wb) || /\n/.test(testCase.wa);
            if (containsNewlines && !$target.is('textarea')) {
                return;
            }

            var text = "some text";
            var selectionStr = testCase.wb + text + testCase.wa;
            var fullStr = testCase.tb + selectionStr + testCase.ta;

            var startPosBeforeTrim = testCase.tb.length;
            var startPosAfterTrim  = testCase.tb.length + testCase.wb.length;

            var endPosBeforeTrim = testCase.tb.length + selectionStr.length;
            var endPosAfterTrim = endPosBeforeTrim - testCase.wa.length;

            $target.val(fullStr);

            $target.selection('setPos', {start: startPosBeforeTrim, end: endPosBeforeTrim});
            // Sanity check. Helps make sure that the control didn't eat our whitespace.
            equal($target.selection('get'), selectionStr, "'" + quoteNewlines(fullStr) + "'");

            $target.selection('trim');

            deepEqual($target.selection('getPos'), {start: startPosAfterTrim, end: endPosAfterTrim});
            equal($target.selection('get'), text);        
        });

        $target.val(oldValue);
    });
});


test('whitespace - no change if no whitespace around selection', function() {
    expect(6);
    [$textarea, $input].forEach(function($target) {
        var oldValue = $target.val();
        var str = "1234567890";
        // substr should be surronded by text that isn't whitespace.
        var start = str.indexOf(4);
        var end = str.indexOf(8) + 1;
        var substr = str.substr(start, end - start);

        $target.val(str);

        $target.selection('setPos', {start: start, end: end});
        equal($target.selection('get'), substr);

        $target.selection('trim');

        // Make sure nothing changed after the trim.
        deepEqual($target.selection('getPos'), {start: start, end: end});
        equal($target.selection('get'), "45678");

        $target.val(oldValue);
    });
});

module('$.selection');

test('get text Test', function () {
    $('body').focus().select('text');
    equal($.selection(), '');
});

test('get html Test', function () {
    $('body').focus().select('html');
    equal($.selection(), '');
});
