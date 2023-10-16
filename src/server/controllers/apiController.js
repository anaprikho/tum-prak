let htmlPage = ""
let answer = ""

// reset the stored HTML content to an empty state
exports.clear = (req, res, next) => {
    try {
        htmlPage = ''
        res.status(200).send('');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

// receive HTML page from CPEE
exports.receiveHTML = (req, res, next) => {
    try {
        htmlPage = req.body.html;

        if (htmlPage.includes('input')) {
            res.set('CPEE-CALLBACK', 'true');  // set custom response header
            answer = req.header('CPEE-CALLBACK', 'true');
        } else {
            answer = '';
        }
        res.status(200).send()  // send response back to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// serve the latest saved HTML page
exports.serveHTML = (req, res, next) => {
    console.log('htmlPage: ', htmlPage)
    if (htmlPage != '') {
        res.send(htmlPage)
    } else {
        res.status(404).send('No HTML pages stored found');
    }
}

// send data received from cleint to engine, clear stored HTML 
exports.onSubmit = async (req, res, next) => {
    try {
        htmlPage = ''

        console.log('Received data from client:', req.body);
        console.log('answer: ', answer)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body['inputValues'])
        };
        fetch(answer, requestOptions)

        res.status(200).send('');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
