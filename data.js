/* Technique coverage behind the paper's Figure 4, generated from the paper's data.
 * share[i] is the fraction of an attacker's successful injections on AgentDojo against Qwen3.6-35B
 * that carry technique i, in the order of classes[].techniques. Do not edit by hand. */
window.AUTOPI_DATA = {
 "classes": [
  {
   "id": "F1",
   "name": "Instruction Manipulation",
   "short": "Instruction",
   "techniques": [
    {
     "id": "F1.T1",
     "name": "Plain command"
    },
    {
     "id": "F1.T2",
     "name": "Override"
    },
    {
     "id": "F1.T3",
     "name": "Task embedding"
    },
    {
     "id": "F1.T4",
     "name": "Emphasis"
    },
    {
     "id": "F1.T5",
     "name": "Indirect phrasing"
    },
    {
     "id": "F1.T6",
     "name": "Execution rules"
    },
    {
     "id": "F1.T7",
     "name": "Proxy request"
    }
   ]
  },
  {
   "id": "F2",
   "name": "Structural Spoofing",
   "short": "Spoofing",
   "techniques": [
    {
     "id": "F2.T1",
     "name": "Delimiters"
    },
    {
     "id": "F2.T2",
     "name": "Control tokens"
    },
    {
     "id": "F2.T3",
     "name": "Structured-data disguise"
    },
    {
     "id": "F2.T4",
     "name": "Fabricated dialogue"
    },
    {
     "id": "F2.T5",
     "name": "Counterfeit tool results"
    }
   ]
  },
  {
   "id": "F3",
   "name": "Obfuscation",
   "short": "Obfuscation",
   "techniques": [
    {
     "id": "F3.T1",
     "name": "Character perturbation"
    },
    {
     "id": "F3.T2",
     "name": "Encoding"
    },
    {
     "id": "F3.T3",
     "name": "Language switching"
    },
    {
     "id": "F3.T4",
     "name": "Fragmentation"
    },
    {
     "id": "F3.T5",
     "name": "Overload"
    },
    {
     "id": "F3.T6",
     "name": "Non-semantic sequence"
    },
    {
     "id": "F3.T7",
     "name": "Rewording"
    },
    {
     "id": "F3.T8",
     "name": "Surrogate syntax"
    }
   ]
  },
  {
   "id": "F4",
   "name": "Social Engineering",
   "short": "Social",
   "techniques": [
    {
     "id": "F4.T1",
     "name": "Authority claim"
    },
    {
     "id": "F4.T2",
     "name": "Emotional appeal"
    },
    {
     "id": "F4.T3",
     "name": "Urgency and threat"
    },
    {
     "id": "F4.T4",
     "name": "Pretext"
    },
    {
     "id": "F4.T5",
     "name": "Commitment"
    },
    {
     "id": "F4.T6",
     "name": "Social proof"
    },
    {
     "id": "F4.T7",
     "name": "Argument and obligation"
    }
   ]
  },
  {
   "id": "F5",
   "name": "Scenario Framing",
   "short": "Framing",
   "techniques": [
    {
     "id": "F5.T1",
     "name": "Persona"
    },
    {
     "id": "F5.T2",
     "name": "Simulation"
    },
    {
     "id": "F5.T3",
     "name": "Fiction and hypotheticals"
    },
    {
     "id": "F5.T4",
     "name": "Game or challenge"
    }
   ]
  },
  {
   "id": "F6",
   "name": "Output Coercion",
   "short": "Coercion",
   "techniques": [
    {
     "id": "F6.T1",
     "name": "Response priming"
    },
    {
     "id": "F6.T2",
     "name": "Refusal suppression"
    },
    {
     "id": "F6.T3",
     "name": "Forced format"
    }
   ]
  }
 ],
 "attackers": [
  {
   "key": "seeds",
   "name": "Static seeds",
   "group": "seed",
   "reached": 5,
   "share": [
    0.0,
    0.0,
    1.0,
    1.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0
   ]
  },
  {
   "key": "piminer",
   "name": "PIMiner",
   "group": "baseline",
   "reached": 22,
   "share": [
    0.0429,
    0.0411,
    0.9267,
    0.644,
    0.229,
    0.2236,
    0.0,
    0.1503,
    0.0984,
    0.2451,
    0.1055,
    0.1574,
    0.0,
    0.0,
    0.0,
    0.0036,
    0.0,
    0.0,
    0.034,
    0.7352,
    0.6404,
    0.0,
    0.059,
    0.5277,
    0.0,
    0.1771,
    0.7227,
    0.0018,
    0.0,
    0.0,
    0.0,
    0.0,
    0.1306,
    0.0358
   ]
  },
  {
   "key": "cth",
   "name": "CtH",
   "group": "baseline",
   "reached": 21,
   "share": [
    0.0114,
    0.0089,
    0.9937,
    0.5254,
    0.014,
    0.217,
    0.0,
    0.0355,
    0.0,
    0.0419,
    0.0076,
    0.0013,
    0.0,
    0.0,
    0.0,
    0.0,
    0.1472,
    0.0,
    0.0381,
    0.0076,
    0.9975,
    0.0,
    0.0063,
    0.0419,
    0.0,
    0.0,
    0.9518,
    0.0,
    0.0013,
    0.0,
    0.0,
    0.0127,
    0.0901,
    0.0228
   ]
  },
  {
   "key": "autodojo",
   "name": "AutoDojo",
   "group": "baseline",
   "reached": 21,
   "share": [
    0.0868,
    0.0,
    0.9215,
    0.7603,
    0.781,
    0.0702,
    0.0041,
    0.0041,
    0.0,
    0.8471,
    0.0207,
    0.0124,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0207,
    0.0,
    0.0289,
    0.2479,
    0.8926,
    0.0124,
    0.0372,
    0.3554,
    0.0083,
    0.0661,
    0.2769,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.186,
    0.0
   ]
  },
  {
   "key": "autopiL1",
   "name": "AutoPI-L1",
   "group": "autopi",
   "reached": 26,
   "share": [
    0.3652,
    0.0478,
    0.6174,
    0.4565,
    0.4261,
    0.0174,
    0.0,
    0.0304,
    0.013,
    0.4348,
    0.0174,
    0.013,
    0.0,
    0.0,
    0.0043,
    0.0,
    0.0261,
    0.0043,
    0.0,
    0.0087,
    0.5565,
    0.0,
    0.0087,
    0.013,
    0.0043,
    0.0043,
    0.0391,
    0.0043,
    0.0,
    0.013,
    0.0,
    0.0391,
    0.1217,
    0.0174
   ]
  },
  {
   "key": "autopiFull",
   "name": "AutoPI-Full",
   "group": "autopi",
   "reached": 31,
   "share": [
    0.2741,
    0.0494,
    0.7136,
    0.3852,
    0.2519,
    0.0222,
    0.0025,
    0.0494,
    0.0272,
    0.2543,
    0.0148,
    0.0148,
    0.0049,
    0.0025,
    0.0049,
    0.0,
    0.0173,
    0.0025,
    0.0,
    0.0049,
    0.4123,
    0.0,
    0.0148,
    0.0988,
    0.0025,
    0.0074,
    0.1136,
    0.0198,
    0.0025,
    0.0148,
    0.0025,
    0.0444,
    0.1358,
    0.0123
   ]
  },
  {
   "key": "autopiSeedPara",
   "name": "AutoPI-Seed-Exploit",
   "group": "autopi",
   "reached": 20,
   "share": [
    0.0264,
    0.0124,
    0.9783,
    0.5683,
    0.2003,
    0.0078,
    0.0,
    0.0621,
    0.0,
    0.2469,
    0.0,
    0.0078,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0031,
    0.0,
    0.0109,
    0.0093,
    0.4519,
    0.0,
    0.0047,
    0.2236,
    0.0,
    0.0031,
    0.2686,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0031,
    0.1009,
    0.0078
   ]
  }
 ]
};
