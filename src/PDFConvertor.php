<?php

namespace PDFConvertor;

class PDFConvertor
{
	static function convert(string $url, string $in, string $out)
	{
		$curl = curl_init();
		curl_setopt_array($curl, [
			CURLOPT_URL => $url,
			CURLOPT_POST => true,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_TIMEOUT => 10,
			CURLOPT_POSTFIELDS => [
    			'file' => new \CURLfile($in)
			]
		]);

		$response = curl_exec($curl);
		file_put_contents($out, $response);

		if (curl_errno($curl)) throw new \Exception(curl_error($curl));

		curl_close($curl);
	}
}