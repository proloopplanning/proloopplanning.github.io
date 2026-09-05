<div align="center">
<b>Code Availability Statement</b><br>
The source code and supplementary materials will be released upon acceptance of the paper.
</div>

## Abstract

ProLoop is a progress-aware closed-loop framework for reliable and timely decision-making in long-horizon robotic task planning. It organizes long-horizon execution as a sequence of semantic subgoals, represents desired outcomes and evolving execution evidence in a shared semantic schema, and explicitly assesses their relation throughout execution. A learned State-Relation Monitor distinguishes ongoing, deviated, and completed progress, enabling the executor to continue normal reasoning, trigger targeted correction, or transition between subgoals at the right time.

## Paper

<div align="center">
The anonymized paper PDF will be available here when the submission version is ready.
</div>

## Video

<div align="center">
Experiment videos will be added after the supplementary materials are finalized.
</div>

## Results

Experiments are conducted on AgentBoard ALFWorld with easy and hard task settings, together with real-world robotic validation. Finalized quantitative results, figures, and experiment videos will be added with the submission materials.

## Methodology

ProLoop maintains explicit awareness of active-subgoal progress by comparing desired and execution states. The pipeline consists of three core components: (i) Structured State Construction, which maps desired outcomes and heterogeneous robot evidence into a common task-state representation; (ii) a State-Relation Monitor, which identifies supported, unresolved, and contradicted conditions and derives subgoal progress; and (iii) Progress-Guided Adaptation, which regulates continuation, correction, and subgoal transition. After verified completion, task-relevant information is consolidated into cross-subgoal memory for subsequent planning.

## Repository

The anonymous project repository is available at [github.com/proloopplanning/proloopplanning.github.io](https://github.com/proloopplanning/proloopplanning.github.io).
