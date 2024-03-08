<?php

include_once '../php/PDFConvertor.php';

$dir = dirname(__FILE__);

PDFConvertor::convert($dir.DIRECTORY_SEPARATOR.'input.docx', 'output.pdf');