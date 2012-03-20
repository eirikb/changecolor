Changecolor
===

This is a simple stand-alone JavaScript module to make CSS colors lighter or darker.  
Based on http://stackoverflow.com/questions/1507931/generate-lighter-darker-color-in-css-using-javascript/1507987#1507987

Usage
---

```HTML
<script src="https://raw.github.com/eirikb/changecolor/master/changecolor.min.js></script>

<script>
    window.onload = function() {
        var someColor = '#AAABBB';

        var lighterColor = changecolor.ligher(someColor, 0.5);
        var darkerColor = changecolor.darker(someColor, 0.5);
    };
</script>
