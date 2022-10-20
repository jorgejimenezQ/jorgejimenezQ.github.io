var Search = (function() {

    /**
     * Provides two static methods for locating the first or last instance of a key
     * in an array of Objects. The methods each need to be supplied a
     * Comparator to give the order of the key.
     *
     * @class 
     * @author Jorge Jimenez
     *
     */
    var Search = function() {

    }


    /**
     * Returns the index of the first key in a[] that equals the search key, or -1
     * if no such key.
     * 
     * @param {Array} a The array holding the keys.
     * @param {Object} key The hey to search for.
     * @param {compareTo} comparator The order of the key.
     * @return {Number} Returns the index of the first key in a[] that equals the search key, or -1 if no such key.
     */
    Search.firstIndexOf = function(a, key, compare) {

        if (a == undefined || key == undefined || compare == undefined)
            throw ("The array, the key, or comparator are undefined.");

        if (compare(key, a[0]) == 0)
            return 0;

        let lo = 0;
        let hi = a.length - 1;
        let mid;

        while (lo <= hi) {
            mid = lo + (hi - lo) / 2;
            mid = Math.trunc(mid);

            if (compare(key, a[mid]) < 0)
                hi = mid - 1;
            else if (compare(key, a[mid]) > 0)
                lo = mid + 1;
            else if (compare(key, a[mid - 1]) == 0)
                hi = mid - 1; // Keep cutting in half until we find the lowest.
            else
                return mid;
        }

        return -1;
    }

    /**
     * Returns the index of the last key in a[] that equals the search key, or -1
     * if no such key.
     * 
     * @param {Array} a The array holding the keys.
     * @param {Object} key The hey to search for.
     * @param {compareTo} comparator The order of the key.
     * @return {Number} Returns the index of the first key in a[] that equals the search key, or -1 if no such key.
     */
    Search.lastIndexOf = function(a, key, compare) {

        if (a == null || key == null || compare == null)
            throw ("The array, the key, or comparator are null.");


        let lo = 0;
        let hi = a.length - 1;
        let mid;

        if (compare(key, a[hi]) == 0)
            return hi;

        while (lo <= hi) {


            mid = lo + (hi - lo) / 2;
            mid = Math.trunc(mid);
        	// console.log(mid);

            if (compare(key, a[mid]) < 0)
                hi = mid - 1;
            else if (compare(key, a[mid]) > 0)
                lo = mid + 1;
            else if (compare(key, a[mid + 1]) == 0)
                lo = mid + 1; // Keep cutting in half until we find the lowest.
            else
                return mid;
        }

        return -1;
    }

    return Search;

}());