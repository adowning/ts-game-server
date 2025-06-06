// Simple WebSocket test script
// Run with: node test-websocket.js

import WebSocket from 'ws'

const ws = new WebSocket('ws://localhost:3000/slots')

ws.on('open', function open() {
  console.log('✅ Connected to WebSocket server')

  // Send initial connection (matches existing protocol)
  console.log('📤 Sending initial connection...')

  // Send auth request
  setTimeout(() => {
    console.log('📤 Sending auth request...')
    ws.send(
      'data:::{"action":"AuthRequest","gameName":"AfricanKingNG","sessionId":"test_session_token_123"}'
    )
  }, 1000)

  // Send balance request
  setTimeout(() => {
    console.log('📤 Sending balance request...')
    ws.send(
      'data:::{"action":"BalanceRequest","gameName":"AfricanKingNG","sessionId":"test_session_token_123"}'
    )
  }, 2000)

  // Send spin request
  setTimeout(() => {
    console.log('📤 Sending spin request...')
    ws.send(
      'data:::{"action":"SpinRequest","gameName":"AfricanKingNG","sessionId":"test_session_token_123","data":{"coin":0.01,"bet":1}}'
    )
  }, 3000)

  // Close connection after tests
  setTimeout(() => {
    console.log('🔌 Closing connection...')
    ws.close()
  }, 5000)
})

ws.on('message', function message(data) {
  console.log('📥 Received:', data.toString())

  try {
    const parsed = JSON.parse(data.toString())
    console.log('📋 Parsed response:', JSON.stringify(parsed, null, 2))
  } catch (e) {
    console.log('📋 Raw response (not JSON):', data.toString())
  }
})

ws.on('error', function error(err) {
  console.error('❌ WebSocket error:', err.message)
})

ws.on('close', function close() {
  console.log('🔌 WebSocket connection closed')
  process.exit(0)
})

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Terminating test...')
  ws.close()
  process.exit(0)
})
