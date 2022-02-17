# Surge Internship - Practical Test

## Explain OOP in real world examples

Object Oriented Programming has 4 base concepts

- Abstraction
- Encapsulation
- Polymorphism
- Inheritance

To explain these concepts, assume you are a game developer. You developing a game called [Valorant](https://playvalorant.com/), which is a first-person shooter genre game that players can choose multiple agents with unique abilities to play with.

### Abstraction

In valorant, every agent has some common properties and methods. For example, every agent has a health percentage, can walk and can jump too.  
Therefore, we can create an abstract class called `Agent` which includes common methods and members and create other agents based on it.

```cpp
// Defining abstract class
class Agent {
  protected:
    float health;

  public:
    void Run() {
      // Run fast
    }

}

// Jett is an agent
class Jett: public Agent {

}

Jett player;
player.Run(); // Player run
```

### Encapsulation

> Concept that keeps data safe from outside interference and misuse

Members can have three types of encapsulation levels,

- private
- public
- protected

Our player has three properties: health, money and score. Let's define those members in our code

```cpp
class Agent {
  protected:
    float health = 100.0;
}

class Player: public Agent {
  private:
    int money = 1000;

  public:
    int score = 0;

    void PurchaseGun() {
      money = money - 100;
    }

    void TookDamage() {
      health = health - 10;
    }
}

Player x;

// "public" means we can access that member from outside
x.score = 100; // ✅

// "private" means those values only accessible to methods of its class
x.money = 0; // ❌ outside access
x.PurchaseGun(); // ✅ now x.money is 900. accessible to class methods

// "protected" is similar to private but accessible to derived class methods
x.TookDamage(); // ✅ now x.health = 90;

```

### Polymorphism

> Having many forms

Polymorphism has two types

- Compile time: Functional & operator overloading
- Runtime: Function overriding

In our game every time player wins, we want a voice line to play to celebrate it. Also sometimes we want to say a custom voice line according to the last died agent. We can accomplish this using polymorphism.

```cpp
class Agent {
  virtual void RoundWon() {
    say("I won!");
  }
}

class Jett: public Agent {
  // functional overloading
  void RoundWon() {
    say("Huh, so easy");
  }

  // functional overriding
  void RoundWon(string lastKill) {
    if (lastKill == "sage") {
      say("I'm sorry sage");
    }
  }
}

Jett x;
x.RoundWon() // Huh, so easy
x.ROundWon("sage") // I'm sorry sage
```

Here function `RoundWon` has many forms and which method to execute is determined by polymorphism.

### Inheritance

> Capability of deriving methods and members from another class

Assume we a class related to a weapon. Now we want to introduced "Golden" variant of that gun. We can use inheritance to derive golden class...

```cpp
class Shotgun {
  public:
    int magazine = 5;
    int fireRate = 20;
}

class GoldenShotgun: public Shotgun {
  public:
    string color = "gold";
}

GoldenShotgun x;
x.magazine; // 5
x.color; //gold
```

## What is the SDLC model and explain the various segments of it?

Software Development Life Cycle (SDLC) is a multiple-phase process for building software. SDLC aims to deliver a high-quality product and good customer satisfaction.

### Phase 1: Planning and requirement analysis

The developing company takes input from the customer and related domain experts. Then proceed feasibility studies according to gathered data and do basic project approaches such as cost estimation, capacity planning and project scheduling.

### Phase 2: Defining Requirements

Define and document the product requirements gathered in phase 1 and create Software Requirement Specification document (SRS).

### Phase 3: Designing

After completion of SRS, software engineers start designing user interfaces, selecting application languages and frameworks, database relationships, the architecture of the application etc.

### Phase 4: Implementation

Once designing phase is complete developers starts writing code to implement modules designed in the previous phase.

### Phase 5: Testing

Testing the code written by developers for various test cases and validate all the requirements have been met, functions working as intended. QAs detects code flaws and inform developers for bug fix.

### Phase 6: Deployment

The finished product will be deployed to production servers and released to related audience. This phase is very short due to automation done by pipelines and workflows defined in previous stages.

### Phase 7: Maintenance

Deployed product is continuously monitored for bugs, application upgrades and enhancements and providing customer support.

## What is Docker / Kubernetes and what is the use of it?

### What is docker

Docker is an open source tool made for managing and deploying containerized applications. Developers creates "containers" of their application and manages through containerization platforms like Docker.

Docker containers can be defined by creating a `Dockerfile` can be deployed through services like `docker-compose`, `docker swarm` or `kubernetes`

### What is Kubernetes

Kubernetes is a popular open-source container orchestrator. An orchestrator is, its taking containers that required to run and decides how to run those containers in a give set of nodes/server.  
Kubernetes automates container related tasks like deployment, health check, logging and load balancing.

## Explain the MVC and MVVM architecture with a diagram.

### MVC

![MVC architecture](/images/mvc.png)

MVC Stands for Model, View, Controller.

Model: Responsible for managing data of the application
View: UI of the application
Controller: Responsible for responding to user inputs and interactions.

### MVVM

![MVVM architecture](/images/mvvm.png)

MVVM stands for Model, View, View Model

Model: Responsible for managing data of the application
View: UI of the application
ViewModel: Act as a link between Model and View

## What is a Data flow diagram

Data flow diagram (DFD) is a structured analysis technique that use to visualize the data that moves through an organization, paths of them and processes that use and transform data

DFDs notation consists of four main symbols

- Process: activities of the system which use and transform information
- Data flows: the data inputs to and outputs from activities
- External entities: sources which information flows into the system and recipients of information
- Data stores: where information stored in the system.

Advantages of using DFDs are,

- Describe system scope and boundaries clearly.
- Provides overall view of the complete system as well as in individual activities
