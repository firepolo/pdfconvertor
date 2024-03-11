<?php

require '../vendor/autoload.php';

use PDFConvertor\PDFConvertor;

PDFConvertor::convert('http://localhost:4000/', dirname(__FILE__).DIRECTORY_SEPARATOR.'input.docx', 'output.pdf');