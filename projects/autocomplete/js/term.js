"use strict";


/**
 * @module ac
 */
const Term = (function() {
    var house = 23;
    /**
     * A string query and an associated real-valued weight. supports comparing
     * terms by three different orders: lexicographic order by query string (the
     * natural order); in descending order by weight (an alternate order); and
     * lexicographic order by query string but using only the first r characters (a
     * family of alternate orderings).
     * 
     * @param {String} query The string to search for. 
     * @param {Double} weight The weight of the term 
     */
    const Term = function(query, weight = 0) {
        this.query = query;
        this.weight = weight;
    }

    /**
     * Compares the terms in lexicographic order but using only the first r
     * characters of each query.
     * 
     * @param r
     * @return {copare} A comparator
     * @throws IllegalArgumentException if r is negative
     */
    Term.byPrefixOrder = function(r) {

        if (r < 0)
            throw "r can not be negative.";
        return (o1, o2) => {

            if (o1 == undefined || o2 == undefined)
                throw "The objects passed in can not be undefined.";

            let r1 = (r > o1.query.length) ? o1.query.length : r;
            let r2 = (r > o2.query.length) ? o2.query.length : r;

            var query1 = o1.query.substring(0, r1);
            var query2 = o2.query.substring(0, r2);

            if (query1.toLowerCase() == query2.toLowerCase())
                return 0;

            if (query1.toLowerCase() < query2.toLowerCase())
                return -1;

            return 1;
        }
    }

    /**
     * Compares the terms in descending order by weight.
     * 
     * @return {compare} A comparator.
     */
    Term.byReverseWeightOrder = function() {
        return (term1, term2) => {
            if (term1.weight == term2.weight)
                return 0;

            if (term1.weight < term2.weight)
                return 1;

            return -1;
        }
    }

    /**
     * Compare the terms in lexicographic order by query.
     * 
     * @return {Number} The value 0 if the argument Term is equal to this Term; a value less
     *         than 0 if this Term is lexicographically less than the Term argument;
     *         and a value greater than 0 if this Term is lexicographically greater
     *         than the Term argument.
     */
    Term.compare = function() {
        return (a, b) => {

            let querya = a.query;
            let queryb = b.query;

            if (querya.toLowerCase() == queryb.toLowerCase())
                return 0;

            if (querya.toLowerCase() < queryb.toLowerCase())
                return -1;

            return 1;
        }
    }

    return Term;
}());
Object.freeze(Term);