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
        var name = $('#name').val().trim();
        var address = $('#address').val().trim();
        var city = $('#city').val().trim();
        var state = $('#state').val().trim();
        var postalCode = $('#postalCode').val().trim();

        // Reset error messages
        $('.error-message').hide();

        // Check if any of the fields are empty
        if (!name) {
            $('#nameError').text('Please enter a name').show();
        }
        if (!address) {
            $('#addressError').text('Please enter an address').show();
        }
        if (!city) {
            $('#cityError').text('Please enter a city').show();
        }
        if (!state) {
            $('#stateError').text('Please enter a state').show();
        }
        if (!postalCode) {
            $('#postalCodeError').text('Please enter a postal code').show();
        }

        // Stop execution if any field is empty
        if (!name || !address || !city || !state || !postalCode) {
            return;
        }

        var newAddress = { name: name, address: address, city: city, state: state, postalCode: postalCode };

        var addresses = JSON.parse(localStorage.getItem('addresses')) || [];

        // Check for duplicate entries
        var isDuplicate = addresses.some(function(existingAddress) {
            return existingAddress.name === newAddress.name 
                && existingAddress.address === newAddress.address 
                && existingAddress.city === newAddress.city 
                && existingAddress.state === newAddress.state 
                && existingAddress.postalCode === newAddress.postalCode;
        });

        if (isDuplicate) {
            alert('This address already exists.');
            return; // Stop execution if address is a duplicate
        }

        // Save the new address
        addresses.push(newAddress);
        localStorage.setItem('addresses', JSON.stringify(addresses));

        $('#shippingAddressForm').hide();
        $('#shippingAddressForm input').val('');
        $('#message').text('Address has been saved').show().delay(5000).fadeOut();
        populateSavedAddressesDropdown(); // Update dropdown after saving address
    });

    // Update address on click of Update Address button
    $('#updateAddressBtn').click(function () {
        var selectedIndex = $('#savedAddressesDropdown').val();
        if (selectedIndex === null) {
            alert('Please select an address to update.');
            return;
        }
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
            // Reset error messages
            $('.error-message').hide();

            var name = $('#name').val().trim();
            var address = $('#address').val().trim();
            var city = $('#city').val().trim();
            var state = $('#state').val().trim();
            var postalCode = $('#postalCode').val().trim();

            // Check if any of the fields are empty
            if (!name) {
                $('#nameError').text('Please enter a name').show();
            }
            if (!address) {
                $('#addressError').text('Please enter an address').show();
            }
            if (!city) {
                $('#cityError').text('Please enter a city').show();
            }
            if (!state) {
                $('#stateError').text('Please enter a state').show();
            }
            if (!postalCode) {
                $('#postalCodeError').text('Please enter a postal code').show();
            }

            // Stop execution if any field is empty
            if (!name || !address || !city || !state || !postalCode) {
                return;
            }

            // Update the selected address with the values from the form fields
            selectedAddress.name = name;
            selectedAddress.address = address;
            selectedAddress.city = city;
            selectedAddress.state = state;
            selectedAddress.postalCode = postalCode;

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
        if (selectedIndex === null) {
            alert('Please select an address to delete.');
            return;
        }
        var addresses = JSON.parse(localStorage.getItem('addresses'));
        addresses.splice(selectedIndex, 1);
        localStorage.setItem('addresses', JSON.stringify(addresses));
        populateSavedAddressesDropdown();
        $('#message').text('Address has been deleted').show().delay(5000).fadeOut();
        $('#shippingAddressForm').hide();
    });
});
