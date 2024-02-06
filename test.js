$(document).ready(function () {
  // Function to populate the saved addresses dropdown
  function populateSavedAddressesDropdown() {
      var savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
      $('#savedAddressesDropdown').empty();
      $.each(savedAddresses, function (index, address) {
          var addressText = address.name + ', ' + address.address + ', ' + address.city + ', ' + address.state + ', ' + address.postalCode;
          $('#savedAddressesDropdown').append($('<option>', {
              value: index,
              text: addressText
          }));
      });
  }

  // Load saved addresses on page load
  populateSavedAddressesDropdown();

  // Show shipping address form on click of Add New Address button
  $('#addNewAddressBtn').click(function () {
      $('#shippingAddressForm').show();
  });

  // Save address on click of Save Address button
  $('#saveAddressBtn').click(function () {
      var name = $('#name').val();
      var address = $('#address').val();
      var city = $('#city').val();
      var state = $('#state').val();
      var postalCode = $('#postalCode').val();
      var newAddress = { name: name, address: address, city: city, state: state, postalCode: postalCode };

      var addresses = JSON.parse(localStorage.getItem('addresses')) || [];
      addresses.push(newAddress);
      localStorage.setItem('addresses', JSON.stringify(addresses));

      $('#shippingAddressForm').hide();
      $('#shippingAddressForm input').val('');
      $('#message').text('Address has been saved').show().delay(5000).fadeOut();
      populateSavedAddressesDropdown(); // Update dropdown after saving address
  });

 // Event handler for when an address is selected from the dropdown
$('#savedAddressesDropdown').change(function() {
  var selectedIndex = $(this).val();
  var addresses = JSON.parse(localStorage.getItem('addresses'));
  var selectedAddress = addresses[selectedIndex];

  // Fill the form fields with the selected address details
  $('#name').val(selectedAddress.name);
  $('#address').val(selectedAddress.address);
  $('#city').val(selectedAddress.city);
  $('#state').val(selectedAddress.state);
  $('#postalCode').val(selectedAddress.postalCode);

  // Show the form
  $('#shippingAddressForm').show();
  // Show a message indicating that the user can update the selected address
  $('#message').text('You can update the selected address').show().delay(5000).fadeOut();

  // Update address on click of Save Address button
  $('#saveAddressBtn').off('click').on('click', function () {
      // Update the selected address with the values from the form fields
      selectedAddress.name = $('#name').val();
      selectedAddress.address = $('#address').val();
      selectedAddress.city = $('#city').val();
      selectedAddress.state = $('#state').val();
      selectedAddress.postalCode = $('#postalCode').val();

      // Update the address in localStorage
      addresses[selectedIndex] = selectedAddress;
      localStorage.setItem('addresses', JSON.stringify(addresses));

      // Hide the form after updating address
      $('#shippingAddressForm').hide();
      $('#shippingAddressForm input').val('');

      // Show message and reload the page
      $('#message').text('Address has been updated').show().delay(5000).fadeOut();
      location.reload(); // Reload the page to reflect the changes in the dropdown
  });
});


  // Delete address on click of Delete Address button
  $('#deleteAddressBtn').click(function () {
      var selectedIndex = $('#savedAddressesDropdown').val();
      var addresses = JSON.parse(localStorage.getItem('addresses'));
      addresses.splice(selectedIndex, 1);
      localStorage.setItem('addresses', JSON.stringify(addresses));
      populateSavedAddressesDropdown();
      $('#message').text('Address has been deleted').show().delay(5000).fadeOut();
      $('#shippingAddressForm').hide();
  });
});
