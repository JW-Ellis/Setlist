// JQUERY calendar function
$(function() {
  const date = $('#date')
    .datepicker({
      minDate: -0,
      maxDate: '+30D',
    })
    .on('change', function() {
      to.datepicker('option', 'minDate', getDate(this));
    });
});

// Change button color

const spotifyButton = document.getElementsByClassName('spotify-button');
spotifyButton.onclick = () => {
  this.style.backgroundColor = '#149141';
};

const searchButton = document.getElementsByClassName('.search-button');
searchButton.onclick = () => {
  this.style.backgroundColor = '#149141';
};
