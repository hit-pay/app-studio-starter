// The Node build of react-dom/server reads these as globals; the runtime sandbox does not provide them.
import { Buffer } from 'node:buffer'
import process from 'node:process'
import { clearImmediate, setImmediate } from 'node:timers'

Object.assign(globalThis, { Buffer, clearImmediate, process, setImmediate })
