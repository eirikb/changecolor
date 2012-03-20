// http://stackoverflow.com/questions/1507931/generate-lighter-darker-color-in-css-using-javascript/1507987#1507987
changecolor = (function() {
    var pad = function(num, totalChars) {
        var pad = '0';
        num = num + '';
        while (num.length < totalChars) {
            num = pad + num;
        }
        return num;
    };

    function doit(color, ratio, darker) {
        var difference, rgb, alpha, decimal, returnValue;

        if (!color) return color;

        // Trim trailing/leading whitespace
        color = color.replace(/^\s*|\s*$/, '');

        // Expand three-digit hex
        color = color.replace(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i, '#$1$1$2$2$3$3');

        // Calculate ratio
        difference = Math.round(ratio * 256) * (darker ? - 1: 1);

        // Determine if input is RGB(A)
        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' + 
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '(?:\\s*,\\s*' +
            '(0|1|0?\\.\\d+))?' +
            '\\s*\\)$', 'i'));

        if (!!rgb && rgb[4] !== null) alpha = rgb[4];
        else alpha = null;

        // Convert hex to decimal
        if (!!rgb) {
            decimal = [rgb[1], rgb[2], rgb[3]];
        } else {
            decimal = color.replace(/^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i, function() {
                return parseInt(arguments[1], 16) +
                    ',' +
                    parseInt(arguments[2], 16) +
                    ',' +
                    parseInt(arguments[3], 16);
            }).split(/,/);
        }

        if (!!rgb) {
            // Return RGB(A)
            return 'rgb' + (alpha !== null ? 'a': '') + '(' +
                Math[darker ? 'max': 'min'](parseInt(decimal[0], 10) + difference, darker ? 0: 255) + ', ' +
                Math[darker ? 'max': 'min'](parseInt(decimal[1], 10) + difference, darker ? 0: 255) + ', ' +
                Math[darker ? 'max': 'min'](parseInt(decimal[2], 10) + difference, darker ? 0: 255) +
                (alpha !== null ? ', ' + alpha: '') + ')';
        } else {
            // Return hex
            return ['#', 
                    pad(Math[darker ? 'max': 'min'](
                        parseInt(decimal[0], 10) + difference, darker ? 0: 255).toString(16), 2), 
                    pad(Math[darker ? 'max': 'min'](
                        parseInt(decimal[1], 10) + difference, darker ? 0: 255).toString(16), 2), 
                    pad(Math[darker ? 'max': 'min'](
                        parseInt(decimal[2], 10) + difference, darker ? 0: 255).toString(16), 2)
                ].join('');
        }
    }

    return {
        lighter: function(color, ratio) {
            return doit(color, ratio, false);
        },
        darker: function(color, ratio) {
            return doit(color, ratio, true);
        }
    };
})();

