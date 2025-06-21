import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState([])

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
      
      // Agregar al historial
      const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`
      setHistory(prev => [historyEntry, ...prev.slice(0, 4)]) // Mantener solo 5 entradas
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const percentage = () => {
    const value = parseFloat(display) / 100
    setDisplay(String(value))
  }

  const squareRoot = () => {
    const value = Math.sqrt(parseFloat(display))
    setDisplay(String(value))
  }

  const power = () => {
    performOperation('^')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="calculator-container">
        {/* Historial */}
        <div className="history-panel mb-4 p-4 bg-black/30 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
          <h3 className="text-cyan-400 text-sm mb-2 font-mono">HISTORIAL</h3>
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {history.map((entry, index) => (
              <div key={index} className="text-xs text-cyan-300/70 font-mono">
                {entry}
              </div>
            ))}
          </div>
        </div>

        {/* Calculadora Principal */}
        <div className="calculator bg-black/40 p-6 rounded-2xl border border-cyan-500/50 backdrop-blur-lg shadow-2xl shadow-cyan-500/20">
          {/* Pantalla */}
          <div className="display mb-6 p-4 bg-black/60 rounded-xl border border-cyan-400/40 shadow-inner">
            <div className="text-right text-4xl font-mono text-cyan-100 min-h-[60px] flex items-center justify-end overflow-hidden">
              {display}
            </div>
            <div className="text-right text-sm text-cyan-400/60 mt-1 font-mono">
              {operation && previousValue !== null && `${previousValue} ${operation}`}
            </div>
          </div>

          {/* Botones */}
          <div className="grid grid-cols-4 gap-3">
            {/* Fila 1 */}
            <Button 
              onClick={clear}
              className="calculator-btn special-btn col-span-2 bg-red-600/80 hover:bg-red-500 border-red-400/50 text-white font-bold"
            >
              CLEAR
            </Button>
            <Button 
              onClick={percentage}
              className="calculator-btn operation-btn bg-purple-600/80 hover:bg-purple-500 border-purple-400/50"
            >
              %
            </Button>
            <Button 
              onClick={() => performOperation('÷')}
              className="calculator-btn operation-btn bg-orange-600/80 hover:bg-orange-500 border-orange-400/50"
            >
              ÷
            </Button>

            {/* Fila 2 */}
            <Button 
              onClick={() => inputNumber(7)}
              className="calculator-btn number-btn"
            >
              7
            </Button>
            <Button 
              onClick={() => inputNumber(8)}
              className="calculator-btn number-btn"
            >
              8
            </Button>
            <Button 
              onClick={() => inputNumber(9)}
              className="calculator-btn number-btn"
            >
              9
            </Button>
            <Button 
              onClick={() => performOperation('×')}
              className="calculator-btn operation-btn bg-orange-600/80 hover:bg-orange-500 border-orange-400/50"
            >
              ×
            </Button>

            {/* Fila 3 */}
            <Button 
              onClick={() => inputNumber(4)}
              className="calculator-btn number-btn"
            >
              4
            </Button>
            <Button 
              onClick={() => inputNumber(5)}
              className="calculator-btn number-btn"
            >
              5
            </Button>
            <Button 
              onClick={() => inputNumber(6)}
              className="calculator-btn number-btn"
            >
              6
            </Button>
            <Button 
              onClick={() => performOperation('-')}
              className="calculator-btn operation-btn bg-orange-600/80 hover:bg-orange-500 border-orange-400/50"
            >
              -
            </Button>

            {/* Fila 4 */}
            <Button 
              onClick={() => inputNumber(1)}
              className="calculator-btn number-btn"
            >
              1
            </Button>
            <Button 
              onClick={() => inputNumber(2)}
              className="calculator-btn number-btn"
            >
              2
            </Button>
            <Button 
              onClick={() => inputNumber(3)}
              className="calculator-btn number-btn"
            >
              3
            </Button>
            <Button 
              onClick={() => performOperation('+')}
              className="calculator-btn operation-btn bg-orange-600/80 hover:bg-orange-500 border-orange-400/50"
            >
              +
            </Button>

            {/* Fila 5 */}
            <Button 
              onClick={squareRoot}
              className="calculator-btn special-btn bg-purple-600/80 hover:bg-purple-500 border-purple-400/50"
            >
              √
            </Button>
            <Button 
              onClick={() => inputNumber(0)}
              className="calculator-btn number-btn"
            >
              0
            </Button>
            <Button 
              onClick={inputDecimal}
              className="calculator-btn number-btn"
            >
              .
            </Button>
            <Button 
              onClick={() => performOperation('=')}
              className="calculator-btn equals-btn bg-cyan-600/80 hover:bg-cyan-500 border-cyan-400/50"
            >
              =
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

