/**
 * Created by jennifergisslow on 2017-02-27.
 */

/*This function will return a true or false string when the checkbox is clicked or not.*/
console.log('den känner av scriptet');

$('#selfCorrectingCheckbox :checkbox').change(function() {
    // this will contain a reference to the checkbox
    var correctingBoxChecked = 'false';

    if (this.checked) {
        // the checkbox is now checked
        console.log('Nu är boxen för självrättattest true');
        correctingBoxChecked = 'true';

    } else {
        // the checkbox is now no longer checked
        console.log('Nu är boxen för självrättattest false');
        correctingBoxChecked = 'false';
    }

    return correctingBoxChecked;
});

/*This function will return a true or false string when the checkbox is clicked or not.*/
$('#approveSeeResult :checkbox').change(function() {
    // this will contain a reference to the checkbox
    var approveBoxChecked = 'false';

    if (this.checked) {
        // the checkbox is now checked
        console.log('Nu är boxen för att eleven ska få se resultatet true');
        approveBoxChecked = 'true';

    } else {
        // the checkbox is now no longer checked
        console.log('Nu är boxen för att eleven ska få se resultatet false');
        approveBoxChecked = 'false';

    }

    return  approveBoxChecked;
});

