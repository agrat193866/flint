import readdirp from 'readdirp'
import mkdirp from 'mkdirp'
import jf from 'jsonfile'
import fs from 'fs'
import rimraf from 'rimraf'
import copyFile from './copyFile'
import path from 'path'

import { Promise } from 'bluebird'
Promise.longStackTraces()

// promisify
const rmdir = Promise.promisify(rimraf)
const mkdir = Promise.promisify(mkdirp)
const readdir = Promise.promisify(readdirp)
const readJSON = Promise.promisify(jf.readFile)
const writeJSON = Promise.promisify(jf.writeFile)
const readFile = Promise.promisify(fs.readFile)
const writeFile = Promise.promisify(fs.writeFile)

const p = path.join
const recreateDir = (dir) =>
  new Promise((res, rej) => {
    rimraf(dir, err => {
      if (err) return rej(err)
      mkdirp(dir, err => {
        if (err) return rej(err)
        res(dir)
      });
    })
  })

export default {
  p,
  mkdir,
  rmdir,
  recreateDir,
  readdir,
  readJSON,
  writeJSON,
  readFile,
  writeFile,
  copyFile
}