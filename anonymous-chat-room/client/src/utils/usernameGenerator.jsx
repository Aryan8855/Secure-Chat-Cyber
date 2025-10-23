const adjectives = [
  'Ghost', 'Shadow', 'Neo', 'Cipher', 'Zero', 'Phantom', 'Void', 'Byte',
  'Cyber', 'Digital', 'Quantum', 'Stealth', 'Silent', 'Dark', 'Mystic',
  'Hidden', 'Secret', 'Covert', 'Cryptic', 'Enigma'
]

const nouns = [
  'Hacker', 'Runner', 'Agent', 'Protocol', 'Matrix', 'Node', 'Stream', 'Code',
  'Byte', 'Bit', 'Signal', 'Vector', 'Protocol', 'System', 'Network', 'Data',
  'Core', 'Shell', 'Kernel', 'Process'
]

export const generateUsername = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const randomNum = Math.floor(Math.random() * 999) + 1
  
  return `${adjective}${noun}#${randomNum.toString().padStart(3, '0')}`
}