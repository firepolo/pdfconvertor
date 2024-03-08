import express from 'express'
import multer from 'multer'
import { promisify } from 'util'
import { existsSync, createReadStream, statSync, unlink } from 'fs'
import { resolve } from 'path'
import { execFile } from 'child_process'
import { exit } from 'process'

function locate(paths)
{
	for (const path of paths)
		if (existsSync(path)) return path
	return null
}

const libreoffice = locate(['/usr/bin/libreoffice', '/usr/lib/libreoffice', '/etc/libreoffice', '/usr/share/libreoffice'])
if (!libreoffice) {
	console.log('libreoffice isn\'t installed.')
	exit(0)
}

const exec = promisify(execFile)
const tmpdir = resolve('./tmp')
const upload = multer({ dest: 'uploads'})
const app = express()

app.post('/test', upload.single('file'), async (req, res) => {
	const input = resolve('./' + req.file.path)
	const { stdout } = await exec(libreoffice, ['--headless', '--convert-to', 'pdf', input, '--outdir', tmpdir, req.file.filename])
	if (!stdout) {
		res.statusCode = 400
		res.end()
		return
	}

	unlink(input, () => {})

	const output = resolve(tmpdir, req.file.filename + '.pdf')
	const stat = statSync(output)

	res.writeHead(200, {
		'Content-Type': 'application/pdf',
		'Content-Length': stat.size
	})

	createReadStream(output).pipe(res)
})

app.listen(4000, () => {
	console.log('The server listen on port 4000.')
})