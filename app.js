
Animals.all = [];

function Animals(data) {
  this.image_url = data.image_url;
  this.title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;
}
Animals.prototype.render = function () {
  $('main').append('<div class="image-container"></div>');

  let $imageContainer = $('div[class="image-container"]');
  $imageContainer.html($('#photo-template').html());
  $imageContainer.find('h2').text(this.title);
  $imageContainer.find('img').attr('src', this.image_url);
  $imageContainer.find('p').text(this.description);
  $imageContainer.attr('class', this.keyword);
  $imageContainer.removeClass('image-container');

}

Animals.requestData = () => {

  $.get('data/page-1.json')
    .then(data => {
      data.forEach(value => {
        Animals.all.push(new Animals(value));


      });
      Animals.all.forEach(image => {
        $('main').append(image.render());

      })
      Animals.renderOption();
    })
    .then(Animals.filterSelected);
}

Animals.renderOption = () => {

  let selectedItems = [];

  Animals.all.forEach(image => {
    if (!selectedItems.includes(image.keyword)) {
      selectedItems.push(image.keyword);
      $('select').append(`<option>${image.keyword}</option>`)
    }
  })
}

Animals.filterSelected = () => {
  $('select').on('change', function () {
    let selection = $(this).val();
    if (selection !== 'filter by keyword') {
      $('div').hide();
      $('div').removeClass('selected');
      Animals.all.forEach(image => {
        if (image.keyword === selection) {
          $(`div[class="${selection}"]`).addClass('selected').fadeIn();
        }
      });
      $(`option[value="${selection}"]`).fadeIn();
    }
  });

}

Animals.requestData();