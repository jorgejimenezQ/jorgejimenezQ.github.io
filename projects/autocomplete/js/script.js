/**
 * Takes the input element to build the autocomplete/suggestions on.
 * and an array of terms to query against.
 * The array can be a list of terms and weights.
 * 
 * @param  {[type]}   Term          [description]
 * @param  {[type]}   Search        [description]
 * @param  {Function} Autocomplete) {               return function(element, array) {        let elInput [description]
 * @return {[type]}                 [description]
 */
var createAutocomplete = (function(Term, Search, Autocomplete) {


    return function(element, array) {
        let elInput = document.getElementById(element);
        let terms = createTerms(array);
        let ac = new Autocomplete(terms);
        let currentFocus;


        elInput.addEventListener("input", (e) => {
            let prevList = document.getElementById("autocomplete-list");
            if (prevList != null)
                prevList.remove();
            currentFocus = -1;
            var suggestList;
            var parent = document.getElementsByClassName("autocomplete")[0];

            suggestList = document.createElement("DIV");
            suggestList.setAttribute("id", "autocomplete-list");
            suggestList.setAttribute("class", "autocomplete-items");
            parent.appendChild(suggestList);
            var query = elInput.value;
            if (query.trim() == "" || query.trim() == " ")
                return -1;

            console.time("Autocomplete Process Time");
            var results = ac.allMatches(query);

            if (results.length == 0) {
                console.timeEnd("Autocomplete Process Time");
                return;
            }
            var size = (results.length < 50) ?
                results.length :
                50;
            for (let i = 0;
                (query.trim() != "") && (i < size); i++) {
                var string = results[i].query;
                var html;
                var item = document.createElement("DIV");

                html = "<strong>" + query + "</strong>" + string.substring(query.length);
                item.innerHTML = html;
                suggestList.appendChild(item);
            }
            console.timeEnd("Autocomplete Process Time");

        });

        elInput.addEventListener("keydown", function(e) {
            var suggestList = document.getElementById("autocomplete-list");

            if (suggestList)
                suggestList = suggestList.children;

            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            if (e.keyCode == 40) {
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(suggestList);

                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
            } else if (e.keyCode == 38) { //up
                currentFocus--;
                addActive(suggestList);

                /*If the ENTER key is pressed, prevent the form from being submitted,*/
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (suggestList) suggestList[currentFocus].click();
                }
            }
        });

        function addActive(suggestList) {
            /*a function to classify an item as "active":*/
            if (!suggestList) return false;

            /*start by removing the "active" class on all items:*/
            removeActive(suggestList);
            currentFocus = currentFocus % suggestList.length;

            /*add class "autocomplete-active":*/
            suggestList[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function createTerms(a) {
            var terms = [];
            if (a[0].weight == undefined) {
                for (let i = 0; i < a.length; i++) {
                    terms.push(new Term(a[i]));
                }
            } else {
                for (let i = 0; i < a.length; i++) {

                    terms.push(new Term(a[i].string, a[i].weight));
                }
            }
            console.timeEnd("Create Terms");
            return terms;
        }

    }


}(Term, Search, Autocomplete));


// var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
createAutocomplete("myInput", items);