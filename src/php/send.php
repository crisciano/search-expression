<?php
header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: max-age=900');
header('Content-Type: application/json'); 

require 'PHPMailerAutoload.php';

if ($_POST) {
	$resposta 		= $_POST['resposta'];
	$emailEmpresa 	= $_POST['email-empresa'];
	$assunto 		= $_POST['assunto']; 
	$empresa 		= $_POST['empresa'];
	$nome 			= $_POST['nome']; 
	$email			= $_POST['email'];
	$telefone 		= $_POST['telefone'];
	$msg 			= $_POST['message'];
	$agradecimento 	= $_POST['agradecimento'];
	$corpo='
		<!DOCTYPE html>
		<html>
		<head>
		</head>
		<body>
		<p>	Nome : '.$nome.' </br></p>
		<p>	Email : '.$email.' </br></p>
		<p>	Telefone : <a href=tel:'.$tel.'>' .$telefone. '</a> </br></p>
		</body>
		</html>';
}else{
	echo "Sem parámetros para enviar o email...";
}
if ($resposta == true) {
	sendEmail($emailEmpresa, $email, $nome, $assunto, $corpo);
	sendEmail($email, $emailEmpresa, $empresa, $assunto, $agradecimento);
}else{
	sendEmail($emailEmpresa, $email, $empresa, $assunto, $corpo);
}

function sendEmail(&$dest, &$send, &$nome, &$assunto, &$corpo ){
	$mail = new PHPMailer;
	$mail->CharSet = 'UTF-8';
	$mail->isSendmail();
	$mail->setFrom($send, $nome);
	$mail->addAddress($dest, $nome);
	$mail->Subject = $assunto;
	$mail->msgHTML($corpo);
	$mail->AltBody = $assunto;
	if (!$mail->send()) { echo "Mailer Error: " . $mail->ErrorInfo; } else { echo "Message sent!";}
}