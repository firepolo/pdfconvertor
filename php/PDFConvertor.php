<?php

class PDFConvertor
{
	static function convert(string $in, string $out)
	{
		$curl = curl_init();
		curl_setopt_array($curl, [
			CURLOPT_URL => 'http://localhost:4000/test',
			CURLOPT_POST => true,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_TIMEOUT => 10,
			CURLOPT_POSTFIELDS => [
    			'file' => new CURLfile($in)
			]
		]);

		$response = curl_exec($curl);

		echo $response;

		if (curl_errno($curl)) throw curl_error($curl);

		curl_close($curl);
	}
}