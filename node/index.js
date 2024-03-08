import express from 'express'
import multer from 'multer'
import { promisify } from 'util'
import { existsSync } from 'fs'
import { join } from 'path'
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
const tmpdir = join(__dirname, '/tmp')
const upload = multer({ dest: 'uploads'})
const app = express()

app.post('/test', upload.single('file'), async (req, res) => {
	console.log(req.file)
	const { stderr } = await exec(libreoffice, ['--headless', '--convert-to', 'pdf', req.file, '--outdir', tmpdir, req.file.filename])
	console.log('OUT?', stdout)
	console.log('ERROR?', stderr)

	res.statusCode = 200
	res.end()
})

app.listen(4000, () => {
	console.log('The server listen on port 4000.')
})