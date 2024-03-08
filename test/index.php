<?php

require '../vendor/autoload.php';

use PDFConvertor\PDFConvertor;

PDFConvertor::convert(dirname(__FILE__).DIRECTORY_SEPARATOR.'input.docx', 'output.pdf');