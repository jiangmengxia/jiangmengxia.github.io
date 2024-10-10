# 开发原则

## 开放封闭（OCP）-- 变与不变

一个软件实体如类、模块和函数应该<mark style="background-color:purple;">对扩展开放，对修改关闭</mark>。

模块应尽量在不修改原代码的情况下进行扩展。也就是说再设计的时候，就要<mark style="background-color:purple;">考虑不变、可变</mark>部分，在需求迭代的过程中只需要迭代可变部分，具备较高的可扩展性。

开放封闭开发原则（Open/Closed Principle，OCP）是面向对象编程中的一个重要原则，它指出软件实体（类、模块、函数等）应该对扩展开放，对修改封闭。这意味着，当需要添加新功能时，应该通过扩展已有代码来实现，而不是修改已有代码。

以下是一些关于开放封闭开发原则的要点：

1. **对扩展开放**：当需要添加新功能时，应该通过扩展已有代码来实现，而不是修改已有代码。这可以提高代码的可维护性和可扩展性。
2. **对修改封闭**：当需要修改已有代码时，应该通过创建新的类或模块来实现，而不是直接修改已有代码。这可以提高代码的可维护性和可扩展性。
3. **接口和抽象**：开放封闭开发原则通常与接口和抽象一起使用。通过定义接口和抽象，可以确保代码的扩展性和灵活性。
4. **继承和多态**：开放封闭开发原则通常与继承和多态一起使用。通过继承和重写方法，可以扩展已有类的功能。

```javascript
class Shape {
  draw() {
    throw new Error('Method not implemented.');
  }
}

class Circle extends Shape {
  draw() {
    console.log('Drawing a circle.');
  }
}

class Square extends Shape {
  draw() {
    console.log('Drawing a square.');
  }
}

const shapes = [new Circle(), new Square()];

shapes.forEach(shape => {
  shape.draw();
});

```

在上面的示例中，`Shape` 类是一个抽象类，它定义了一个 `draw` 方法。`Circle` 类和 `Square` 类是 `Shape` 类的子类，它们重写了 `draw` 方法。当需要添加新的形状时，只需要创建一个新的类，并继承 `Shape` 类，然后重写 `draw` 方法。这符合开放封闭开发原则，因为我们可以通过扩展已有代码来实现新功能，而不需要修改已有代码。

## 单一职责（SRP）

单一职责开发原则（Single Responsibility Principle，SRP）是面向对象编程中的一个重要原则，它指出一个类应该只有一个引起它变化的原因。这意味着，一个类应该只负责一个功能，而不是多个功能。

以下是一些关于单一职责开发原则的要点：

1. **职责分离**：单一职责开发原则要求将一个类的职责分离到多个类中。每个类应该只负责一个功能，而不是多个功能。
2. **高内聚**：单一职责开发原则要求类的高内聚，即类内部的元素应该紧密相关，共同完成一个功能。
3. **低耦合**：单一职责开发原则要求类之间的低耦合，即类之间的依赖应该最小化。
4. **易于测试和维护**：单一职责开发原则可以使代码更易于测试和维护，因为每个类的职责单一，可以独立测试和修改。

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    // 保存用户到数据库
  }

  sendEmail() {
    // 发送邮件给用户
  }
}

```

在上面的示例中，`User` 类负责保存用户和发送邮件。然而，这违反了单一职责开发原则，因为 `User` 类负责了两个功能：保存用户和发送邮件。我们可以将 `User` 类拆分为两个类：`User` 类负责保存用户，`EmailService` 类负责发送邮件。

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    // 保存用户到数据库
  }
}

class EmailService {
  sendEmail(email) {
    // 发送邮件给用户
  }
}

```

在上面的示例中，`User` 类和 `EmailService` 类分别负责保存用户和发送邮件。这符合单一职责开发原则，因为每个类只负责一个功能。

## 迪米特（LoD）-- 解耦

迪米特法则（Law of Demeter，LoD）是面向对象编程中的一个重要原则，它指出一个对象应该尽可能少地了解其他对象，简称“类间解耦”。这意味着，<mark style="background-color:purple;">一个对象应该只与其直接关联的对象进行交互</mark>，而不是与其所有关联的对象进行交互。

以下是一些关于迪米特法则的要点：

1. **减少耦合**：迪米特法则要求减少对象之间的耦合，即对象之间的依赖应该最小化。这可以提高代码的可维护性和可扩展性。
2. **降低复杂度**：迪米特法则要求降低对象之间的复杂度，即对象之间的交互应该简单明了。这可以提高代码的可读性和可维护性。
3. **提高可测试性**：迪米特法则可以使代码更易于测试，因为每个对象只与其直接关联的对象进行交互。这可以提高代码的可测试性。

以下是一个使用迪米特法则的示例：

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    // 保存用户到数据库
  }
}

class EmailService {
  sendEmail(email) {
    // 发送邮件给用户
  }
}

class UserService {
  constructor(emailService) {
    this.emailService = emailService;
  }

  registerUser(name, email) {
    const user = new User(name, email);
    user.save();

    this.emailService.sendEmail(email);
  }
}
```

在上面的示例中，`UserService` 类只与其直接关联的对象 `User` 和 `EmailService` 进行交互。`UserService` 类不直接与 `User` 类和 `EmailService` 类的所有关联对象进行交互，这符合迪米特法则。

## 里氏替换（LSP）-- 继承规则

里式替换原则（Liskov Substitution Principle，LSP）是用来帮助我们在继承关系中进行父子类的设计。

里氏替换原则主要阐述了有关继承的一些原则，也就是什么时候应该使用继承，什么时候不应该使用继承，以及其中蕴含的原理。里氏替换原是继承复用的基础，它反映了基类与子类之间的关系，是对开闭原则的补充，是对实现抽象化的具体步骤的规范。

以下是一些关于里氏替换原则的要点：

1. **子类和父类的关系**：里氏替换原则要求子类和父类之间应该存在一种 "is-a" 的关系，即子类对象应该能够替换父类对象。
2. **保持接口不变**：里氏替换原则要求子类应该保持父类的接口不变，即子类对象应该能够使用父类的所有方法。
3. **保持行为一致**：里氏替换原则要求子类应该保持父类的行为一致，即子类对象的行为应该与父类对象的行为一致。
4. **保持状态一致**：里氏替换原则要求子类应该保持父类的状态一致，即子类对象的状态应该与父类对象的状态一致。

[https://cloud.tencent.com/developer/article/1831005](https://cloud.tencent.com/developer/article/1831005)

```javascript
class Shape {
  draw() {
    throw new Error('Method not implemented.');
  }
}

class Circle extends Shape {
  draw() {
    console.log('Drawing a circle.');
  }
}

class Square extends Shape {
  draw() {
    console.log('Drawing a square.');
  }
}

function drawShape(shape) {
  shape.draw();
}

const shapes = [new Circle(), new Square()];

shapes.forEach(shape => {
  drawShape(shape);
});

```

在上面的示例中，`Shape` 类是一个抽象类，它定义了一个 `draw` 方法。`Circle` 类和 `Square` 类是 `Shape` 类的子类，它们重写了 `draw` 方法。`drawShape` 函数接受一个 `Shape` 对象，并调用其 `draw` 方法。由于 `Circle` 类和 `Square` 类是 `Shape` 类的子类，因此我们可以将 `Circle` 对象和 `Square` 对象传递给 `drawShape` 函数，而不改变程序的正确性。这符合里氏替换原则。

## 依赖倒置（DIP）-- 依赖

依赖倒置原则（Dependency Inversion Principle，DIP）是面向对象编程中的一个重要原则，它指出高层模块不应该依赖于低层模块，二者都应该依赖于抽象。抽象不应该依赖于细节，细节应该依赖于抽象。

以下是一些关于依赖倒置原则的要点：

1. **高层模块和低层模块的依赖关系**：依赖倒置原则要求高层模块不应该依赖于低层模块，二者都应该依赖于抽象。这意味着，高层模块应该依赖于接口或抽象类，而不是具体的类。
2. **抽象和细节的依赖关系**：依赖倒置原则要求抽象不应该依赖于细节，细节应该依赖于抽象。这意味着，具体的类应该依赖于接口或抽象类，而不是具体的类。
3. **提高代码的可维护性和可扩展性**：依赖倒置原则可以提高代码的可维护性和可扩展性，因为高层模块和低层模块的依赖关系被反转，从而降低了模块之间的耦合。

## 接口隔离（ISP）-- 对外接口精简

接口隔离原则（Interface Segregation Principle，ISP）是面向对象编程中的一个重要原则，它指出不应该强迫客户端依赖于它们不使用的方法。这意味着，应该将大的接口拆分为小的接口，每个接口只包含客户端需要的方法。

以下是一些关于接口隔离原则的要点：

1. **避免不必要的依赖**：接口隔离原则要求避免不必要的依赖，即不应该强迫客户端依赖于它们不使用的方法。
2. **提高代码的可维护性和可扩展性**：接口隔离原则可以提高代码的可维护性和可扩展性，因为小的接口更容易理解和修改，也更容易添加新的功能。
3. **提高代码的可测试性**：接口隔离原则可以提高代码的可测试性，因为小的接口更容易测试，也更容易模拟。

### 接口隔离原则的实现方法 <a href="#id-18eaa" id="id-18eaa"></a>

在具体应用接口隔离原则时，应该根据以下几个规则来衡量。

&#x20;1）接口要尽量小，不能出现Fat Interface；但是要有限度，首先不能违反单一职责原则（不能一个接口对应半个职责）。

2）接口要高内聚 在接口中尽量少公布public方法。 接口是对外的承诺，承诺越少对系统的开发越有利。

3）定制服务只提供访问者需要的方法。例如，为管理员提供IComplexSearcher接口，为公网提供ISimpleSearcher接口。

4）接口的设计是有限度的 了解环境，拒绝盲从。每个项目或产品都有选定的环境因素，环境不同，接口拆分的标准就不同, 需要深入了解业务逻辑。



**以上为六大开发原则 >>>**

***

**以下为其他的开发原则 >>>**

## 最小授权原则（PoLP）

也称最小暴露原则，是指在软件设计过程中，应该最小限度地暴露出必要的内容，而将其他非必要内容隐藏起来

在前端开发中，最小授权原则（Principle of Least Privilege，PoLP）同样适用。这意味着，前端应用应该只<mark style="background-color:purple;">请求和访问完成其任务所必需的最小权限和资源</mark>。以下是一些应用最小授权原则的方法：

1. **使用OAuth 2.0**：OAuth 2.0是一种授权框架，它允许前端应用请求和访问用户的特定资源，而不需要获取用户的密码。前端应用应该使用OAuth 2.0来请求和访问用户的资源。

&#x20;      [https://www.ruanyifeng.com/blog/2014/05/oauth\_2\_0.html](https://www.ruanyifeng.com/blog/2014/05/oauth\_2\_0.html)

2. **使用JWT**：JSON Web Token（JWT）是一种用于在各方之间安全地传输信息的紧凑、URL安全的表示方法。前端应用应该使用JWT来验证用户的身份，并请求和访问用户的资源。

&#x20;       [https://www.ruanyifeng.com/blog/2018/07/json\_web\_token-tutorial.html](https://www.ruanyifeng.com/blog/2018/07/json\_web\_token-tutorial.html)

3. **使用CORS**：跨源资源共享（CORS）是一种机制，它允许服务器指定哪些源可以访问其资源。前端应用应该使用CORS来请求和访问跨源的资源。
4. **使用HTTPS**：HTTPS是一种安全的通信协议，它使用SSL/TLS来加密数据传输。前端应用应该使用HTTPS来请求和访问敏感资源。
5. **使用Web Storage API**：Web Storage API提供了一种在客户端存储数据的方式。前端应用应该使用Web Storage API来存储和访问用户的数据，而不是使用敏感资源。
6. **使用Web Cryptography API**：Web Cryptography API提供了一种在客户端进行加密和解密的方式。前端应用应该使用Web Cryptography API来保护用户的数据，而不是使用敏感资源。

请注意，最小授权原则是一个重要的安全原则，它可以帮助你保护用户的数据和资源。你应该始终遵循最小授权原则，并使用安全的技术和最佳实践来保护你的应用。

## 合成复用

合成复用设计模式（Composite Reuse Principle，CRP）是面向对象编程中的一个重要原则，它指出在设计中，应该优先使用对象组合（组合）而不是继承（继承）来达到复用的目的。

以下是一些关于合成复用设计模式的要点：

1. **对象组合**：合成复用设计模式要求优先使用对象组合，即通过将对象组合在一起来达到复用的目的。这可以提高代码的可维护性和可扩展性。
2. **继承**：合成复用设计模式要求避免使用继承，除非继承是必要的。这可以提高代码的可维护性和可扩展性。
3. **提高代码的可维护性和可扩展性**：合成复用设计模式可以提高代码的可维护性和可扩展性，因为对象组合可以更灵活地组合和复用对象，而继承可能会导致代码的耦合和复杂性。

## 去重原则（PoD）

去重原则（Principle of Duality，PoD）是面向对象编程中的一个重要原则，它指出在面向对象编程中，应该避免重复代码。这意味着，应该将重复的代码提取到单独的类或模块中，以便在多个地方重用。

以下是一些关于去重原则的要点：

1. **避免重复**：去重原则要求避免重复代码，即不应该在不同的地方编写相同的代码。
2. **代码重用**：去重原则要求代码重用，即应该将重复的代码提取到单独的类或模块中，以便在多个地方重用。
3. **提高可维护性**：去重原则可以提高代码的可维护性，因为只有一处代码需要修改，而不是多个地方。
4. **提高可扩展性**：去重原则可以提高代码的可扩展性，因为可以在一个地方添加新的功能，而不是在多个地方添加。
