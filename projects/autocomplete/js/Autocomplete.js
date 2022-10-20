
/**
 * @module ac
 */
var Autocomplete = (function(Term, Search) {


    /**
     * 
     * An immutable data type that provides autocomplete functionality for a given
     * set of string and weights, using Term and Search. It does so, by
     * sorting the terms in lexicographic order; using binary search if finds the
     * set of terms that start with a given prefix; and sorts the matching terms in
     * descending order by weight. The weight property of the term is optional.
     * 
     *
     * @class
     * @param {Term[]} terms Array of Terms.
     * @author Jorge Jimenez
     */
    var Autocomplete = function(terms) {

        this.terms = terms.slice();
        this.terms.sort(Term.compare());
    }

    /**
     * Returns all terms that start with the given prefix, in descending order of
     * weight.
     * 
     * @param {String} prefix The string we are searching for.
     * @return {Term[]} Returns all terms that start with the given prefix, in descending order of weight.
     */
    Autocomplete.prototype.allMatches = function(prefix) {


        if (prefix == undefined)
            throw "The prefix is undefined.";

        let r = prefix.length;
        let foundTerms = [];
        // Get the first occurrence of the prefix.
        let first = Search.firstIndexOf(this.terms, new Term(prefix), Term.byPrefixOrder(r));

        // Get the last occurrence of the prefix.
        let last = Search.lastIndexOf(this.terms, new Term(prefix), Term.byPrefixOrder(r));

        if (first < 0)
            return foundTerms;

        // Get an array starting from the first to the last occurrence.
        foundTerms = this.terms.slice(first, last + 1);

        // Sort in descending order by weight.
        foundTerms.sort(Term.byReverseWeightOrder());
        return foundTerms;
    }

    /**
     * Returns the number of terms that start with the given prefix.
     * 
     * @throws java.lang.NullPointerException if argument is null.
     * @param prefix
     * @return int
     */
    Autocomplete.prototype.numberOfMatches = function(prefix) {

        if (prefix == undefined)
            throw "The prefix is undefined.";

        let r = prefix.length;
        // Get the first occurrence of the prefix.
        let first = Search.firstIndexOf(this.terms, new Term(prefix), Term.byPrefixOrder(r));

        // Get the last occurrence of the prefix.
        let last = Search.lastIndexOf(this.terms, new Term(prefix), Term.byPrefixOrder(r));

        return last - first + 1;
    }

    return Autocomplete;
}(Term, Search));