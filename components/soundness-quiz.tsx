"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

const section1Questions: Question[] = [
  {
    question: "What is the main goal of Soundness on Sui?",
    options: [
      "To build a decentralized exchange",
      "To verify proofs that ensure computation integrity",
      "To mint NFTs with AI artwork",
      "To create liquidity for Move tokens",
    ],
    correctAnswer: 1,
  },
  {
    question: "In Soundness, what does a 'proof' generally represent?",
    options: [
      "A user's transaction history",
      "A guarantee that a computation or claim is correct",
      "A Move module declaration",
      "A validator node's signature",
    ],
    correctAnswer: 1,
  },
  {
    question: "When a proof is uploaded to Soundness, what happens?",
    options: [
      "It automatically mints a token",
      "It's stored privately in a local vault",
      "It's verified on-chain to confirm validity",
      "It's deleted after being checked",
    ],
    correctAnswer: 2,
  },
  {
    question: "Soundness leverages which blockchain for verifiable storage and computation tracking?",
    options: ["Solana", "Sui", "Polygon", "Avalanche"],
    correctAnswer: 1,
  },
  {
    question: "Why is Soundness important for decentralized AI and data verification?",
    options: [
      "It helps encrypt models for training",
      "It lets AI models prove they ran correctly without exposing data",
      "It replaces validators with GPUs",
      "It hides computation errors",
    ],
    correctAnswer: 1,
  },
  {
    question: "In cryptographic terms, what does 'soundness' ensure?",
    options: [
      "Only false proofs can pass",
      "Every verified proof corresponds to a true statement",
      "Proofs are random and unverifiable",
      "Data is encrypted beyond recovery",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which of these best describes Soundness's potential ecosystem role?",
    options: [
      "Proof registry and integrity oracle for Sui apps",
      "Cross-chain bridge",
      "Token launchpad",
      "File storage layer",
    ],
    correctAnswer: 0,
  },
  {
    question: "What might developers use Soundness for?",
    options: [
      "To verify zero-knowledge computations",
      "To host front-end websites",
      "To mint meme tokens",
      "To send private payments",
    ],
    correctAnswer: 0,
  },
  {
    question: "What makes Soundness particularly suited for AI and cryptographic projects?",
    options: [
      "It connects GPU clusters for model training",
      "It provides verifiable proof trails for off-chain computations",
      "It replaces validators with AI models",
      "It focuses only on image-based proofs",
    ],
    correctAnswer: 1,
  },
  {
    question: "What's a possible benefit of uploading proofs to Soundness?",
    options: [
      "Off-chain proofs remain unverifiable",
      "Projects gain auditable trust for computations",
      "Validators earn double rewards",
      "It reduces Sui gas fees permanently",
    ],
    correctAnswer: 1,
  },
]

const section2Questions: Question[] = [
  {
    question: "In the Soundness Layer architecture, which chain acts as the coordinator for sequencing proofs?",
    options: ["Ethereum", "Solana", "Sui", "Polkadot"],
    correctAnswer: 2,
  },
  {
    question: "What is the role of Walrus in the Soundness + Sui design?",
    options: [
      "It handles consensus among validators",
      "It stores zk proofs (data availability)",
      "It is the on-chain token",
      "It executes Move smart contracts",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Which zero-knowledge proof scheme is mentioned in the Sui blog as satisfying correctness, soundness, and zero-knowledge?",
    options: ["Bulletproofs", "Sonic", "Groth16", "PLONK"],
    correctAnswer: 2,
  },
  {
    question:
      "What property stronger than 'soundness' is often required in applications, but Groth16 by itself does not provide?",
    options: ["Completeness", "Simulation-soundness", "Non-malleability", "Zero-knowledge"],
    correctAnswer: 1,
  },
  {
    question: "In the Soundness design, what mechanism allows validators to support multiple blockchains?",
    options: ["Cross-chain bridges", "Re-staking", "Sharding", "Merkle proofs"],
    correctAnswer: 1,
  },
  {
    question: "Which of the following best describes soundness (in logic / proof systems)?",
    options: [
      "Only false proofs can pass",
      "Every provable statement is valid / true",
      "The proof system is fast",
      "The proof system is complete",
    ],
    correctAnswer: 1,
  },
  {
    question: "In Sui's transaction model, 'simple transactions' are processed:",
    options: [
      "Only after global consensus",
      "In parallel outside the consensus path",
      "Only via smart contracts",
      "After being batched",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is one attack vector discovered on Sui known as 'HamsterWheel'?",
    options: [
      "Causing fork reorg",
      "Infinite loop DoS in verifier",
      "Double spend via re-randomizing proofs",
      "Validator bribery",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "In the Soundness Layer flow, after validators verify proofs, they perform an attestation by calling which function in Move?",
    options: ["submit_proof", "verify_and_sign", "transfer_prove", "attest_signature"],
    correctAnswer: 2,
  },
  {
    question: "Which property ensures that a prover of a proof actually knows a valid witness?",
    options: ["Completeness", "Zero-knowledge", "Soundness", "Non-interactivity"],
    correctAnswer: 2,
  },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function SoundnessQuiz() {
  const [currentSection, setCurrentSection] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [section1Complete, setSection1Complete] = useState(false)

  const shuffledSection1 = useMemo(() => shuffleArray(section1Questions), [])
  const shuffledSection2 = useMemo(() => shuffleArray(section2Questions), [])

  const allQuestions = [...shuffledSection1, ...shuffledSection2]
  const totalQuestions = allQuestions.length
  const section1Length = shuffledSection1.length

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const currentQ = allQuestions[currentQuestion]
    const isCorrect = selectedAnswer === currentQ.correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      if (currentQuestion === section1Length - 1) {
        setSection1Complete(true)
      } else {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      }
    } else {
      setQuizComplete(true)
    }
  }

  const handleProceedToSection2 = () => {
    setSection1Complete(false)
    setCurrentSection(2)
    setCurrentQuestion(section1Length)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleRestartQuiz = () => {
    setCurrentSection(1)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizComplete(false)
    setSection1Complete(false)
  }

  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  if (section1Complete) {
    const section1Score = score
    const section1Percentage = Math.round((section1Score / section1Length) * 100)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-balance">Section 1 Complete!</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Great job finishing the first section
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="mb-2 text-6xl font-bold text-primary">
                {section1Score}/{section1Length}
              </div>
              <div className="text-xl text-muted-foreground">{section1Percentage}% Correct</div>
            </div>

            <div className="space-y-2 rounded-lg bg-secondary/50 p-6">
              <div className="text-sm text-muted-foreground">Section 1 Performance</div>
              <Progress value={section1Percentage} className="h-3" />
              <div className="text-sm text-muted-foreground">
                {section1Percentage >= 80 && "Excellent! Ready for Section 2? 🚀"}
                {section1Percentage >= 60 && section1Percentage < 80 && "Good work! Let's continue to Section 2! 💪"}
                {section1Percentage >= 40 && section1Percentage < 60 && "Nice effort! Section 2 awaits! 📚"}
                {section1Percentage < 40 && "Keep going! Section 2 is next! 🎯"}
              </div>
            </div>

            <Button onClick={handleProceedToSection2} className="w-full" size="lg">
              Proceed to Section 2
            </Button>
          </CardContent>
        </Card>
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          made with 💙 for{" "}
          <a
            href="https://x.com/soundnesslabs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @SoundnessLabs
          </a>{" "}
          by{" "}
          <a
            href="https://x.com/badboyszn03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @Best
          </a>
        </footer>
      </div>
    )
  }

  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-balance">Quiz Complete!</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              You've finished the Soundness quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="mb-2 text-6xl font-bold text-primary">
                {score}/{totalQuestions}
              </div>
              <div className="text-xl text-muted-foreground">{percentage}% Correct</div>
            </div>

            <div className="space-y-2 rounded-lg bg-secondary/50 p-6">
              <div className="text-sm text-muted-foreground">Performance</div>
              <Progress value={percentage} className="h-3" />
              <div className="text-sm text-muted-foreground">
                {percentage >= 80 && "Excellent work! You're a Soundness expert! 🎉"}
                {percentage >= 60 && percentage < 80 && "Great job! You have a solid understanding! 👏"}
                {percentage >= 40 && percentage < 60 && "Good effort! Keep learning about Soundness! 📚"}
                {percentage < 40 && "Keep studying! You'll get there! 💪"}
              </div>
            </div>

            <Button onClick={handleRestartQuiz} className="w-full" size="lg">
              <RotateCcw className="mr-2 h-4 w-4" />
              Restart Quiz
            </Button>
          </CardContent>
        </Card>
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          made with 💙 for{" "}
          <a
            href="https://x.com/soundnesslabs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @SoundnessLabs
          </a>{" "}
          by{" "}
          <a
            href="https://x.com/badboyszn03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @Best
          </a>
        </footer>
      </div>
    )
  }

  const currentQ = allQuestions[currentQuestion]
  const isCorrect = selectedAnswer === currentQ.correctAnswer

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl border-primary/20 bg-card/50 backdrop-blur">
        <CardHeader>
          <div className="mb-2 text-center">
            <h1 className="text-3xl font-bold text-primary">Soundness Quiz</h1>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-primary">
              Section {currentSection} • Question {(currentQuestion % section1Length) + 1} of{" "}
              {currentSection === 1 ? section1Length : section2Questions.length}
            </CardDescription>
            <CardDescription className="text-sm font-medium text-muted-foreground">
              Score: {score}/{totalQuestions}
            </CardDescription>
          </div>
          <Progress value={progress} className="mb-4 h-2" />
          <CardTitle className="text-2xl font-bold leading-relaxed text-balance">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrectAnswer = index === currentQ.correctAnswer
              const showCorrect = showResult && isCorrectAnswer
              const showIncorrect = showResult && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={cn(
                    "w-full rounded-lg border-2 p-4 text-left transition-all duration-200",
                    "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50",
                    isSelected && !showResult && "border-primary bg-primary/10",
                    !isSelected && !showResult && "border-border bg-secondary/30",
                    showCorrect && "border-green-500 bg-green-500/10",
                    showIncorrect && "border-destructive bg-destructive/10",
                    showResult && "cursor-not-allowed",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-semibold",
                          isSelected && !showResult && "border-primary bg-primary text-primary-foreground",
                          !isSelected && !showResult && "border-muted-foreground/30 text-muted-foreground",
                          showCorrect && "border-green-500 bg-green-500 text-white",
                          showIncorrect && "border-destructive bg-destructive text-destructive-foreground",
                        )}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-base leading-relaxed">{option}</span>
                    </div>
                    {showCorrect && <CheckCircle2 className="h-6 w-6 shrink-0 text-green-500" />}
                    {showIncorrect && <XCircle className="h-6 w-6 shrink-0 text-destructive" />}
                  </div>
                </button>
              )
            })}
          </div>

          {showResult && (
            <div
              className={cn(
                "rounded-lg border-2 p-4",
                isCorrect ? "border-green-500/50 bg-green-500/10" : "border-destructive/50 bg-destructive/10",
              )}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 shrink-0 text-destructive" />
                )}
                <div>
                  <div className={cn("font-semibold", isCorrect ? "text-green-500" : "text-destructive")}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </div>
                  {!isCorrect && (
                    <div className="mt-1 text-sm text-muted-foreground">
                      The correct answer is: {currentQ.options[currentQ.correctAnswer]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {!showResult ? (
              <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className="w-full" size="lg">
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} className="w-full" size="lg">
                {currentQuestion < totalQuestions - 1 ? "Next Question" : "View Results"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        made with 💙 for{" "}
        <a
          href="https://x.com/soundnesslabs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          @SoundnessLabs
        </a>{" "}
        by{" "}
        <a
          href="https://x.com/badboyszn03"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          @Best
        </a>
      </footer>
    </div>
  )
}
