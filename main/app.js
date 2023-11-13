/*
 * the function renders an object to a tagged string and performs token substitution
 * @param {object} input - a javascript object representing a hierachycal structure  
 * @param {object} values - a list of key value pairs where the key is a token to be replaced with the value in strings present in input
 */


function render(input, values) {
    //Verificam daca parametrul input e gol si daca e de tipul object(ca sa nu returneze gol si cand nu e object si gol)
    if (Object.keys(input).length === 0 && typeof input ==='object') {
        return '';
    }
    //Verificam daca parametrii sunt nuli/nu au tipul obj si aruncam eroarea
    if (!input || typeof input !== 'object' || !values || typeof values !== 'object') {
        throw new Error('InvalidType');
    }

    function renderRecursive(obj) {
        let result = '';

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];

                if (typeof value === 'object') {
                    result += `<${key}>${renderRecursive(value)}</${key}>`;
                } else if (typeof value === 'string') {
                    result += `<${key}>${value.replace(/\${(.*?)}/g, (match, p1) => values[p1] || match)}</${key}>`;
                }
            }
        }

        return result;
    }

    try {
        return renderRecursive(input);
    } catch (error) {
        throw error;
    }
}

module.exports = { render };


  