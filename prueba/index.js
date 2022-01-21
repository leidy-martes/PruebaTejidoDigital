window.addEventListener('load', function () {

    const form = document.querySelector('form')

    form.addEventListener('submit', function (e) {

        e.preventDefault()
        const files = form.querySelector('[type="file"]').files
        const promises = []
        for (let file of files) {

            promises.push(new Promise(function (resolve, reject) {
                new Compressor(file, {
                    quality: 0.6,
                    success(result) {
                        const formData = new FormData();
                        // The third parameter is required for server
                        formData.append('files', result, result.name);       
                        // Send the compressed image file to server with XMLHttpRequest.
                        // axios.post('files-handler.php', formData).then(function (response) {
                        //     // handle success
                        //     alert(response.data.mensaje);
                        //     console.log(response.data.mensaje);
                        // })
                        // .catch(function (error) {
                        //     console.log(error);
                        // })

                        $.ajax({
                            url: 'files-handler.php',
                            data: formData,
                            dataType: 'json',
                            type: 'post',

                            beforeSend: function () {
                                $('body').toast({
                                    class: 'info',
                                    message: 'Cargando...'
                                  });
                            },
                            success:  function (response) {
                                $('body').toast({
                                    class: 'success',
                                    message: 'response.data.mensaje'
                                  });
                                jQuery("#resultado").html(response);

                            },

                            error : function(xhr, error) {
                                $('body').toast({
                                    class: 'error',
                                    message: 'error'
                                  });
                            }
                        });
                    },
                    error(err) {
                        console.log(err.message)
                        reject()
                    },
                })
            }))
        }
    })
})