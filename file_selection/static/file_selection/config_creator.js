// Remove data from local storage to avoid being able to revisit page and see outdated information
var existingDisplayMode = localStorage.getItem('mode');
localStorage.clear();
if (existingDisplayMode != null) {
    localStorage.setItem('mode', existingDisplayMode);
}

$(document).ready(function () {
    var darkMode;

    // Checks if user has preset preference for color mode
    if (localStorage.getItem('mode') == 'light') {
        initialize('light');
        darkMode = false;
    } else {
        initialize('dark');
        darkMode = true;
    }

    // Sets inital color mode based on users stored preference (light or dark mode)
    function initialize(type) {
        if (type == 'dark') {
            document.getElementById('darkMode').innerHTML = 'Light Mode';
            document.getElementsByTagName('body')[0].style.backgroundColor = '#333';
            document.getElementsByTagName('body')[0].style.color = '#fff';
        } else {
            document.getElementById('darkMode').innerHTML = 'Dark Mode';
            document.getElementsByTagName('body')[0].style.backgroundImage = '#fff';
            document.getElementsByTagName('body')[0].style.color = 'black';
        }
    }


    // Allows users to switch between to light and dark mode
    $('#darkMode').click(function () {
        if (!darkMode) {
            localStorage.setItem('mode', 'dark');
            document.getElementById('darkMode').innerHTML = 'Light Mode';
            document.getElementsByTagName('body')[0].style.backgroundColor = '#333';
            document.getElementsByTagName('body')[0].style.color = '#fff';
            darkMode = true;
        } else {
            localStorage.setItem('mode', 'light');
            document.getElementById('darkMode').innerHTML = 'Dark Mode';
            document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
            document.getElementsByTagName('body')[0].style.color = 'black';
            darkMode = false;
        }
    });

    var entityList = ["[entities]\n"];
    var attributeList = ["[attributes]\n"];

    var entityCount = 0;
    $('#addEntity').click(function () {
        var inputEntity = document.getElementById('entityName').value;

        entityList.push(inputEntity + "\n");

        document.getElementById('entityName').value = '';

        if (inputEntity.trim() != '') {
            entityCount++;
            document.getElementById('entityList').innerHTML += '<span style="padding:10px; color:black; border-radius:5px; margin:5px; font-size:15px; font-weight:bold; background-color:lightgray;">' + inputEntity + '</span>';
            if (entityCount % 5 == 0) {
                document.getElementById('entityList').innerHTML += '<br><br>';
            }
        }
        updateConfigurationFileURL();
    });

    var attributeCount = 0;
    $('#addAttribute').click(function () {
        var inputAttributeName = document.getElementById('attributeName').value;
        var inputAttributeRelation = document.getElementById('attributeRelation').value;
        var inputAttributeDropdown = document.getElementById('attributeDropdown').value.split(',');

        var dropdownValues = "";
        for (var i=0; i<inputAttributeDropdown.length; i++) {
            if (i != inputAttributeDropdown.length-1) {
                dropdownValues += inputAttributeDropdown[i] + "|";
            } else {
                dropdownValues += inputAttributeDropdown[i];
            }
        }

        var inputAttribute = inputAttributeName + " " + "Arg:" + inputAttributeRelation + ", Value:" + dropdownValues;
        attributeList.push(inputAttribute + "\n");

        document.getElementById('attributeName').value = '';
        document.getElementById('attributeRelation').value = '';
        document.getElementById('attributeDropdown').value = '';

        if (inputAttribute.trim() != '') {
            attributeCount++;
            document.getElementById('attributeList').innerHTML += '<span style="padding:10px; color:black; border-radius:5px; margin:5px; font-size:15px; font-weight:bold; background-color:lightgray;">' + inputAttribute + '</span>';
            if (attributeCount % 5 == 0) {
                document.getElementById('attributeList').innerHTML += '<br><br>';
            }
        }
        updateConfigurationFileURL();
    });

    function updateConfigurationFileURL() {
        var a = document.getElementById('saveConfigurationFile');
        var fileName = 'annotation.conf';
        var contentType = 'text/plain';
    
        var blob = new Blob(entityList.concat(attributeList), { type: contentType });
        window.URL.revokeObjectURL(a.href);
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
    }
});