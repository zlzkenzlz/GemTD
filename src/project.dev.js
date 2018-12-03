require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  ATile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6f90b/HapFGeJ/T4ChN38us", "ATile");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ATile = function() {
      function ATile(pos) {
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.position = null;
        this.last = null;
        pos && (this.position = pos);
      }
      ATile.prototype.getF = function() {
        this.f = this.g + this.h;
      };
      ATile = __decorate([ ccclass ], ATile);
      return ATile;
    }();
    exports.default = ATile;
    cc._RF.pop();
  }, {} ],
  BulletPosion: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "316693cPIpBZpKwqRiNpaX0", "BulletPosion");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enemy_1 = require("./Enemy");
    var Bullet_1 = require("./Bullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BulletPosion = function(_super) {
      __extends(BulletPosion, _super);
      function BulletPosion() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BulletPosion.prototype.update = function(dt) {
        this.target.name || this.node.destroy();
        this.target && this.bulletTarget();
      };
      BulletPosion.prototype.onCollisionEnter = function(other, self) {
        if ("1" != other.tag) return;
        if (other.node.getComponent(Enemy_1.default).index == this.indexTarget) {
          if (!other.node.getComponent(Enemy_1.default).isDie) {
            other.node.getComponent(Enemy_1.default).activePosion(this.damagePosion, this.timeActive);
            other.node.getComponent(Enemy_1.default).slow(this.slow, this.timeActive);
            other.node.getComponent(Enemy_1.default).takeDame(this.damage, this.indexGemCreateBullet);
          }
          this.node.destroy();
        }
      };
      BulletPosion = __decorate([ ccclass ], BulletPosion);
      return BulletPosion;
    }(Bullet_1.default);
    exports.default = BulletPosion;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy"
  } ],
  Bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d3b5a2FkzFOV5DDyYRClDO8", "Bullet");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Bullet = function(_super) {
      __extends(Bullet, _super);
      function Bullet() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.indexTarget = 0;
        _this.indexGemCreateBullet = -1;
        _this.damage = 1;
        _this.crit = 1;
        _this.slow = 1;
        _this.timeActive = 1;
        _this.nameExplosion = "";
        _this.damagePosion = 1;
        _this.stun = 0;
        _this.direction = null;
        _this.chanceCrit = 0;
        _this.chanceStun = 0;
        return _this;
      }
      Bullet.prototype.update = function(dt) {
        this.target.name || this.node.destroy();
        this.target && this.bulletTarget();
      };
      Bullet.prototype.bulletTarget = function() {
        if (!this.target) return;
        var oldPos = this.node.getPosition();
        var targetUpdate = this.target.getPosition();
        var direction = cc.pNormalize(cc.pSub(targetUpdate, oldPos));
        var newPos = cc.pAdd(oldPos, cc.pMult(direction, 5));
        this.node.setPosition(newPos);
        this.node.rotation = cc.radiansToDegrees(Math.atan2(newPos.x, newPos.y));
      };
      Bullet.prototype.bulletTargetStay = function() {
        var oldPos = this.node.getPosition();
        var newPos = cc.pAdd(oldPos, cc.pMult(this.direction, 5.5));
        this.node.setPosition(newPos);
      };
      Bullet.prototype.chance = function(per) {
        var max = 1 / (per / 100);
        var min = 1;
        var ran = Math.floor(Math.random() * (max - min + 1)) + min;
        return 1 == ran;
      };
      Bullet.prototype.checkColli = function(other, self) {
        if ("1" != other.tag) return;
        if (other.node.getComponent(Enemy_1.default).index == this.indexTarget) {
          if (!other.node.getComponent(Enemy_1.default).isDie) {
            this.chance(this.chanceCrit) && (this.damage *= this.crit);
            this.chance(this.chanceStun) && other.node.getComponent(Enemy_1.default).stun(this.stun);
            (this.slow > 1 || -1 == this.slow) && other.node.getComponent(Enemy_1.default).slow(this.slow, this.timeActive);
            this.damagePosion > 1 && other.node.getComponent(Enemy_1.default).activePosion(this.damagePosion, this.timeActive);
            other.node.getComponent(Enemy_1.default).takeDame(this.damage, this.indexGemCreateBullet);
          }
          "" == this.nameExplosion ? this.node.destroy() : this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {
            this.node.destroy();
          }, this)));
        }
      };
      Bullet.prototype.onCollisionEnter = function(other, self) {
        this.checkColli(other, self);
      };
      Bullet = __decorate([ ccclass ], Bullet);
      return Bullet;
    }(cc.Component);
    exports.default = Bullet;
    cc._RF.pop();
  }, {
    "./Enemy": "Enemy"
  } ],
  CameraControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "672e5gYuOtAUITz5qwTk3An", "CameraControl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CameraControl = function(_super) {
      __extends(CameraControl, _super);
      function CameraControl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.camera = null;
        _this.target = null;
        return _this;
      }
      CameraControl.prototype.start = function() {};
      CameraControl.prototype.update = function(dt) {
        var targetPos;
        targetPos = this.target.parent.convertToWorldSpaceAR(this.target.position);
        this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos);
      };
      __decorate([ property(cc.Camera) ], CameraControl.prototype, "camera", void 0);
      __decorate([ property(cc.Node) ], CameraControl.prototype, "target", void 0);
      CameraControl = __decorate([ ccclass ], CameraControl);
      return CameraControl;
    }(cc.Component);
    exports.default = CameraControl;
    cc._RF.pop();
  }, {} ],
  Enemy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f27aTiXWpHM4uTwJPYAxR2", "Enemy");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HitDamage_1 = require("./HitDamage");
    var Gem_1 = require("./Gem");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Enemy = function(_super) {
      __extends(Enemy, _super);
      function Enemy() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.startHealth = 350;
        _this.startSpeed = .85;
        _this.index = 0;
        _this.speed = 0;
        _this.pathMove = [];
        _this.delayTime = 0;
        _this.currentHealth = 0;
        _this.damePosion = 0;
        _this.slowPer = 0;
        _this.dirScale = 1;
        _this.ani = null;
        _this.animState = null;
        _this.isDie = false;
        _this.isSlow = false;
        _this.isPosion = false;
        _this.gameController = null;
        _this.endPos = null;
        _this.hitPrefab = null;
        _this.progressBar = null;
        _this.HpUi = null;
        return _this;
      }
      Enemy.prototype.damageToEndPos = function() {
        return 1;
      };
      Enemy.prototype.update = function(dt) {
        if (this.isDie) return;
        this.checkEndPos();
        this.move();
        this.updateHpUI();
        this.animState.speed = this.speed / 4;
      };
      Enemy.prototype.onLoad = function() {
        this.speed = this.startSpeed;
        this.ani = this.getComponent(cc.Animation);
        this.animState = this.ani.getAnimationState("Walk");
        this.currentHealth = this.startHealth = this.gameController.dataWaveEnemy[this.gameController.countWay].details.HP;
        this.dirScale = this.node.scaleX;
      };
      Enemy.prototype.updateHpUI = function() {
        this.progressBar.progress = this.currentHealth / this.startHealth;
      };
      Enemy.prototype.move = function() {
        if (this.pathMove.length > 0) {
          var needMoveX = true;
          var xRound = Math.round(this.node.x);
          var pathXRound = Math.round(this.pathMove[0].x);
          needMoveX = xRound != pathXRound;
          if (needMoveX) {
            this.ani.getAnimationState("Walk").isPlaying || (this.animState = this.ani.play("Walk"));
            if (xRound < pathXRound) {
              this.progressBar.reverse = false;
              this.node.scaleX = this.dirScale;
              this.node.x += this.speed;
              if (this.node.x > pathXRound) {
                this.node.setPosition(this.pathMove[0]);
                this.pathMove.shift();
                return;
              }
            } else {
              this.progressBar.reverse = true;
              this.node.scaleX = -1 * this.dirScale;
              this.node.x -= this.speed;
              if (this.node.x < pathXRound) {
                this.node.setPosition(this.pathMove[0]);
                this.pathMove.shift();
                return;
              }
            }
          } else if (this.node.y < this.pathMove[0].y) {
            this.ani.getAnimationState("WalkTop").isPlaying || (this.animState = this.ani.play("WalkTop"));
            this.progressBar.reverse = false;
            this.node.scaleX = this.dirScale;
            this.node.y += this.speed;
            if (this.node.y > this.pathMove[0].y) {
              this.node.setPosition(this.pathMove[0]);
              this.pathMove.shift();
              return;
            }
          } else {
            this.ani.getAnimationState("WalkDown").isPlaying || (this.animState = this.ani.play("WalkDown"));
            this.progressBar.reverse = false;
            this.node.scaleX = this.dirScale;
            this.node.y -= this.speed;
            if (this.node.y < this.pathMove[0].y) {
              this.node.setPosition(this.pathMove[0]);
              this.pathMove.shift();
              return;
            }
          }
          cc.pointEqualToPoint(this.node.getPosition(), this.pathMove[0]) && this.pathMove.shift();
        }
      };
      Enemy.prototype.checkEndPos = function() {
        var currentTilePos = this.gameController.mapController.tilePosistion(this.node.getPosition());
        var endTilePos = this.gameController.mapController.tilePosistion(this.endPos);
        if (cc.pointEqualToPoint(currentTilePos, endTilePos)) {
          this.gameController.takeDamage(this.damageToEndPos());
          this.node.destroy();
        }
      };
      Enemy.prototype.takeDame = function(damage, index) {
        this.currentHealth -= damage;
        if (this.currentHealth <= 0) {
          if (-1 != index) for (var _i = 0, _a = this.gameController.slates; _i < _a.length; _i++) {
            var a = _a[_i];
            a.getComponent(Gem_1.default).index == index && a.getComponent(Gem_1.default).numSelfKill++;
          }
          this.dieEffect();
        }
        var hit = cc.instantiate(this.hitPrefab);
        hit.setPosition(this.node.getPosition());
        hit.setPositionY(this.node.getPositionY() + this.node.height);
        hit.getComponent(HitDamage_1.default).damageDisplay = damage;
        this.gameController.mapController.node.addChild(hit);
      };
      Enemy.prototype.dieEffect = function() {
        this.isDie = true;
        this.HpUi.active = false;
        this.unscheduleAllCallbacks();
        var act1 = cc.callFunc(function() {
          this.animState = this.ani.play("Die");
        }, this);
        var act2 = cc.callFunc(function() {
          this.node.destroy();
        }, this);
        this.node.runAction(cc.sequence(act1, cc.delayTime(1.8), act2));
      };
      Enemy.prototype.activePosion = function(damagePosion, timeActive) {
        if (damagePosion > this.damePosion || !this.isPosion) {
          this.damePosion = damagePosion;
          this.isPosion = true;
          this.unschedule(this.takePosion);
          this.schedule(this.takePosion, 1, timeActive - 1, 0);
          var act2 = cc.callFunc(function() {
            this.isPosion = false;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(timeActive), act2));
        }
      };
      Enemy.prototype.takePosion = function() {
        this.currentHealth -= this.damePosion;
        this.currentHealth <= 0 && this.dieEffect();
        var hit = cc.instantiate(this.hitPrefab);
        hit.setPosition(this.node.getPosition());
        hit.setPositionY(this.node.getPositionY() + this.node.height);
        hit.getComponent(HitDamage_1.default).damageDisplay = this.damePosion;
        this.gameController.mapController.node.addChild(hit);
      };
      Enemy.prototype.ReleaseSlow = function() {
        this.damePosion = 0;
        this.slowPer = 0;
        this.speed = this.startSpeed;
      };
      Enemy.prototype.ReleaseStun = function() {
        this.speed = this.startSpeed;
        this.slowPer > 0 && (this.speed = this.startSpeed - this.startSpeed * this.slowPer / 100);
      };
      Enemy.prototype.slow = function(slow, timeActive) {
        timeActive < 0 && (this.speed = this.startSpeed - this.startSpeed * slow / 100);
        if ((slow > this.slowPer || !this.isSlow) && timeActive > 0) {
          this.slowPer = slow;
          this.speed = this.startSpeed - this.startSpeed * slow / 100;
          this.isSlow = true;
          this.unschedule(this.ReleaseSlow);
          this.schedule(this.ReleaseSlow, timeActive + 1, 0, 0);
          var act2 = cc.callFunc(function() {
            this.isSlow = false;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(timeActive), act2));
        }
      };
      Enemy.prototype.stun = function(time) {
        this.speed = 0;
        this.unschedule(this.ReleaseStun);
        this.schedule(this.ReleaseStun, time, 0, 0);
      };
      __decorate([ property(cc.ProgressBar) ], Enemy.prototype, "progressBar", void 0);
      __decorate([ property(cc.Node) ], Enemy.prototype, "HpUi", void 0);
      Enemy = __decorate([ ccclass ], Enemy);
      return Enemy;
    }(cc.Component);
    exports.default = Enemy;
    cc._RF.pop();
  }, {
    "./Gem": "Gem",
    "./HitDamage": "HitDamage"
  } ],
  GameController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ff067PVApxGxq/WZzaAv8HO", "GameController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MapController_1 = require("./MapController");
    var Tile_1 = require("./Tile");
    var Gem_1 = require("./Gem");
    var Stone_1 = require("./Stone");
    var Enemy_1 = require("./Enemy");
    var InitData_1 = require("./InitData");
    var GemOpal_1 = require("./GemOpal");
    var ManagerUi_1 = require("./ManagerUi");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameController = function(_super) {
      __extends(GameController, _super);
      function GameController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.countWay = 0;
        _this.countGemCreate = 0;
        _this.round = 1;
        _this.hp = 20;
        _this.gold = 0;
        _this.mileWays = [];
        _this.tiles = [];
        _this.gems = [];
        _this.slates = [];
        _this.gemsCurrentWay = [];
        _this.path = [];
        _this.stones = [];
        _this.row = 0;
        _this.col = 0;
        _this.indexAround = [];
        _this.tileSize = 0;
        _this.enemys = [];
        _this.endPos = null;
        _this.indexKeepGem = 0;
        _this.indexEnemy = 1;
        _this.indexGem = 0;
        _this.gemDisplaying = null;
        _this.slateDisplaying = null;
        _this.levelPlayer = 0;
        _this.endMile = null;
        _this.isEndWay = false;
        _this.isActiveWay = false;
        _this.isKeepGem = false;
        _this.isPathCanMove = true;
        _this.isFlyEnemyNextWay = false;
        _this.blockInputEvent = true;
        _this.isCompleteBuild = true;
        _this.touchStartPos = null;
        _this.touchCurrentPos = null;
        _this.touchStart = false;
        _this.touchMove = false;
        _this.touchEnd = false;
        _this.gemClick = null;
        _this.slateClick = null;
        _this.tempCreateGem = null;
        _this.stonePick = null;
        _this.mileStart = null;
        _this.gemPrefab = [];
        _this.enemyPrefab = [];
        _this.stonePrefab = null;
        _this.milePrefab = null;
        _this.mileStartPrefab = null;
        _this.hitPrefab = null;
        _this.buildCloudPrefab = null;
        _this.combineListPrefab = null;
        _this.gemCombinePrefab = [];
        _this.slateCombinePrefab = [];
        _this.blockInputUi = null;
        _this.managerUi = null;
        _this.shopUi = null;
        _this.playerUi = null;
        _this.showInput = null;
        _this.displayInfoGem = null;
        _this.displayInfoSlate = null;
        _this.btnIsKeepBuild = null;
        _this.btnCreateGem = null;
        _this.btnStartWay = null;
        _this.btnRemoveStone = null;
        _this.btnRemoveGem = null;
        _this.btnCombine = null;
        _this.listHighlight = null;
        _this.displayRangeUi = null;
        _this.notifica = null;
        _this.gra = null;
        _this.infoCombine = null;
        _this.targetCamera = null;
        _this.addGemInMap = null;
        _this.addStoneInMap = null;
        _this.addEnemyInMap = null;
        _this.addSlateInMap = null;
        _this.dataGem = [];
        _this.dataSlate = [];
        _this.dataGemCombine = [];
        _this.dataWaveEnemy = [];
        _this.effectSelect = [];
        _this.listGemsRemoveCombine = [];
        _this.listSlateCanCombine = [];
        _this.gemKeepCombine = null;
        _this.gemCombine = null;
        _this.formulaCombineGem = [];
        _this.formulaCombineSlate = [];
        return _this;
      }
      GameController.prototype.onLoad = function() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        var urlGem = cc.url.raw("resources/GemBasic.json");
        var urlWaveEnemy = cc.url.raw("resources/enemy_wave.json");
        var urlFormulaGemCombineList = cc.url.raw("resources/ListCombineGem.json");
        var urlGemCombine = cc.url.raw("resources/GemCombine.json");
        var urlFormulaSlateCombineList = cc.url.raw("resources/ListSlate.json");
        var urlSlateCombine = cc.url.raw("resources/SlateCombine.json");
        var self = this;
        cc.loader.load(urlGem, function(err, res) {
          self.dataGem = res;
        });
        cc.loader.load(urlSlateCombine, function(err, res) {
          self.dataSlate = res.ListSlateCombine;
        });
        cc.loader.load(urlWaveEnemy, function(err, res) {
          self.dataWaveEnemy = res;
          self.updateUi();
        });
        cc.loader.load(urlFormulaGemCombineList, function(err, res) {
          self.formulaCombineGem = res.Combine;
          self.managerUi.loadFormulaCombine();
        });
        cc.loader.load(urlGemCombine, function(err, res) {
          self.dataGemCombine = res.ListGemCombine;
        });
        cc.loader.load(urlFormulaSlateCombineList, function(err, res) {
          self.formulaCombineSlate = res.CombineSlate;
        });
        this.roundUI = this.playerUi.getChildByName("Round").getComponent(cc.Label);
        this.enemysWayUI = this.playerUi.getChildByName("EnemysWay").getComponent(cc.Label);
        this.hpUI = this.playerUi.getChildByName("HP").getComponent(cc.Label);
        this.goldUI = this.playerUi.getChildByName("Gold").getComponent(cc.Label);
        this.levelUI = this.playerUi.getChildByName("LvPlayer").getComponent(cc.Label);
        this.tileSize = 32;
        this.mileWays = InitData_1.default.mileWays;
        this.mapController.gameController = this;
        this.isActiveWay = false;
        this.gold = 2e3;
        this.row = 44;
        this.col = 60;
        this.indexEnemy = 1;
        this.levelPlayer = 1;
        this.addGemInMap = this.mapController.node.getChildByName("AddGem");
        this.addStoneInMap = this.mapController.node.getChildByName("AddStone");
        this.addEnemyInMap = this.mapController.node.getChildByName("AddEnemy");
        this.addSlateInMap = this.mapController.node.getChildByName("AddSlate");
        this.generaTileAndMiles();
        this.addTouchOn();
        var posFirstMile = this.mapController.pixelPosition(this.mileWays[0]);
        posFirstMile.x += this.tileSize / 2;
        posFirstMile.y += this.tileSize / 2;
        this.gra.node.setPosition(posFirstMile.x, posFirstMile.y);
        this.endMile = this.mapController.pixelPosition(this.mileWays[this.mileWays.length - 1]);
      };
      GameController.prototype.generaTileAndMiles = function() {
        for (var i = 0; i < this.col; i++) for (var j = 0; j < this.row; j++) {
          var a = new Tile_1.default();
          a.hasGem = a.hasSlate = a.hasStone = false;
          a.pos = cc.v2(j, i);
          this.tiles.push(a);
        }
        for (var i = 0; i < this.mileWays.length; i++) {
          var m = void 0;
          var posMile = this.mapController.pixelPosition(this.mileWays[i]);
          if (0 == i) {
            m = cc.instantiate(this.mileStartPrefab);
            this.mileStart = m;
          } else {
            m = cc.instantiate(this.milePrefab);
            posMile.x += this.tileSize / 2;
            posMile.y += this.tileSize / 2;
          }
          m.setPosition(posMile);
          m.getChildByName("index").getComponent(cc.Label).string = (i + 1).toString();
          this.addGemInMap.addChild(m);
          var x = this.mileWays[i].x;
          var y = this.mileWays[i].y;
          var arr = [ cc.v2(x, y), cc.v2(x + 2, y), cc.v2(x, y - 2), cc.v2(x + 2, y - 2) ];
          for (var j = 0; j < arr.length; j++) {
            if (arr[j].y < 0 || arr[j].x < 0 || arr[j].x + 1 >= this.row || arr[j].y + 1 >= this.col) continue;
            var around = [ arr[j].y * this.row + arr[j].x, arr[j].y * this.row + arr[j].x - 1, (arr[j].y + 1) * this.row + arr[j].x, (arr[j].y + 1) * this.row + arr[j].x - 1 ];
            for (var a = 0; a < around.length; a++) this.tiles[around[a]].hasMile = true;
          }
        }
      };
      GameController.prototype.setSizeUI = function() {
        var widgetLeftMap = (cc.director.getWinSize().width - 16 * this.row) / 2;
        var wid = this.mapController.getComponent(cc.Widget);
        wid.left = wid.right = widgetLeftMap;
      };
      GameController.prototype.getPaths = function(isFly) {
        this.path = [];
        for (var i = 0; i < this.mileWays.length - 1; i++) {
          var partPath = this.mapController.moveToward(this.mileWays[i], this.mileWays[i + 1], isFly);
          if (partPath.length < 1) {
            this.isPathCanMove = false;
            console.log("Can't Move");
            break;
          }
          this.isPathCanMove = true;
          this.path.push(partPath);
        }
      };
      GameController.prototype.addTouchOn = function() {
        var self = this;
        var pos;
        var posPixel;
        var index;
        var tempIndex;
        var posStart;
        var func = function(event) {
          var touches = event.getTouches();
          var touchLocation = touches[0].getLocation();
          var location = self.mapController.node.convertToNodeSpaceAR(touchLocation);
          location = cc.pAdd(location, self.targetCamera.getPosition());
          if (self.blockInputEvent) {
            if ("touchstart" == event.type) {
              self.touchStart = true;
              self.touchEnd = false;
              self.touchMove = false;
              self.touchStartPos = location;
            }
            if ("touchmove" == event.type) {
              self.touchMove = true;
              self.touchCurrentPos = location;
            }
            if ("touchend" == event.type) {
              self.touchStart = false;
              self.touchEnd = true;
              self.touchMove = false;
            }
            "touchcancel" == event.type && console.log("touchcancel");
          } else {
            if (self.btnIsKeepBuild.active) return;
            self.countGemCreate < 5 && (location.y += 4 * self.tileSize);
            self.endPos = location;
            pos = self.mapController.tilePosistion(location);
            posPixel = self.mapController.pixelPosition(pos);
            index = pos.y * self.row + pos.x;
            self.indexAround = [ pos.y * self.row + pos.x, pos.y * self.row + pos.x + 1, (pos.y + 1) * self.row + pos.x, (pos.y + 1) * self.row + pos.x + 1 ];
            if (!self.tiles[index]) return;
            if ("touchmove" == event.type && tempIndex == index) return;
            if (self.countGemCreate < 5 && !self.tiles[index].hasGem && self.isCompleteBuild) {
              if (self.gemDisplaying || self.stonePick) return;
              self.showInput.active = true;
              self.showInput.color = new cc.Color(240, 237, 165);
              self.showInput.setPosition(cc.v2(posPixel.x + self.tileSize / 2, posPixel.y - self.tileSize / 2));
              self.showInput.getChildByName("GemCount").getComponent(cc.Label).string = "(" + (5 - self.countGemCreate).toString() + ")";
              if (self.isCanCreateGem(self.indexAround)) {
                if (!self.isCompleteBuild) return;
                if (tempIndex != index) {
                  tempIndex = index;
                  for (var _i = 0, _a = self.indexAround; _i < _a.length; _i++) {
                    var a = _a[_i];
                    self.tiles[a].hasGem = true;
                  }
                  self.getPaths(false);
                  self.showPathsMove();
                  for (var _b = 0, _c = self.indexAround; _b < _c.length; _b++) {
                    var a = _c[_b];
                    self.tiles[a].hasGem = false;
                  }
                }
                if (self.isPathCanMove) {
                  if (("touchend" == event.type || "touchcancel" == event.type) && self.isCompleteBuild) {
                    self.btnIsKeepBuild.setPosition(posPixel.x + self.tileSize / 2, posPixel.y - self.tileSize / 2);
                    self.btnIsKeepBuild.active = true;
                  }
                } else {
                  "touchend" != event.type && "touchcancel" != event.type || (self.showInput.active = false);
                  "touchmove" == event.type && (self.showInput.color = cc.Color.RED);
                  self.gra.clear();
                }
              } else {
                "touchend" != event.type && "touchcancel" != event.type || (self.showInput.active = false);
                "touchmove" == event.type && (self.showInput.color = cc.Color.RED);
                self.gra.clear();
              }
            }
          }
        };
        var clickGemOrStone = function(event) {
          if (self.btnIsKeepBuild.active) return;
          if (self.showInput.active) return;
          var touches = event.getTouches();
          var touchLocation = touches[0].getLocation();
          var location = self.mapController.node.convertToNodeSpaceAR(touchLocation);
          location = cc.pAdd(location, self.targetCamera.getPosition());
          self.endPos = location;
          pos = self.mapController.tilePosistion(location);
          posPixel = self.mapController.pixelPosition(pos);
          index = pos.y * self.row + pos.x;
          self.gemDisplaying = null;
          self.slateClick = null;
          self.stonePick = null;
          self.updateListGems();
          self.updateListStone();
          self.listGemsRemoveCombine = [];
          if (self.tiles[index].hasStone) for (var _i = 0, _a = self.stones; _i < _a.length; _i++) {
            var a = _a[_i];
            var b = a.getComponent(Stone_1.default).pos;
            var square = [ cc.v2(b.x, b.y), cc.v2(b.x + 1, b.y), cc.v2(b.x, b.y + 1), cc.v2(b.x + 1, b.y + 1) ];
            for (var _b = 0, square_1 = square; _b < square_1.length; _b++) {
              var c = square_1[_b];
              if (cc.pointEqualToPoint(c, pos) && !self.isKeepGem) {
                self.stonePick = a;
                var posStone = self.mapController.pixelPosition(a.getComponent(Stone_1.default).pos);
                self.btnRemoveStone.setPosition(posStone.x + self.tileSize / 2, posStone.y + 2 * self.tileSize);
                self.btnRemoveStone.active = true;
                break;
              }
            }
          } else self.btnRemoveStone.active = false;
          if (self.tiles[index].hasGem) {
            for (var _c = 0, _d = self.gems; _c < _d.length; _c++) {
              var a = _d[_c];
              var b = a.getComponent(Gem_1.default).pos;
              var square = [ cc.v2(b.x, b.y), cc.v2(b.x + 1, b.y), cc.v2(b.x, b.y + 1), cc.v2(b.x + 1, b.y + 1) ];
              for (var _e = 0, square_2 = square; _e < square_2.length; _e++) {
                var c = square_2[_e];
                if (cc.pointEqualToPoint(c, pos)) {
                  self.gemDisplaying = a;
                  break;
                }
              }
            }
            if (!self.isKeepGem) for (var _f = 0, _g = self.gemsCurrentWay; _f < _g.length; _f++) {
              var a = _g[_f];
              if ("" == a.name) continue;
              var b = a.getComponent(Gem_1.default).pos;
              var c = self.gemDisplaying.getComponent(Gem_1.default).pos;
              if (cc.pointEqualToPoint(b, c)) {
                self.indexKeepGem = index;
                break;
              }
            }
            if (self.gemDisplaying) {
              var comp = self.gemDisplaying.getComponent(Gem_1.default);
              var damage = [ comp.minDamage(), comp.maxDamage() ];
              self.showDisplayGem(comp.pos, comp.Type(), damage, comp.range(), self.gemDisplaying, comp.icon);
            }
          } else {
            self.gemDisplaying = null;
            self.displayRangeUi.active = self.displayInfoGem.active = false;
          }
          if (self.tiles[index].hasSlate) {
            for (var _h = 0, _j = self.slates; _h < _j.length; _h++) {
              var a = _j[_h];
              var b = a.getComponent(Gem_1.default).pos;
              var square = [ cc.v2(b.x, b.y), cc.v2(b.x + 1, b.y), cc.v2(b.x, b.y + 1), cc.v2(b.x + 1, b.y + 1) ];
              for (var _k = 0, square_3 = square; _k < square_3.length; _k++) {
                var c = square_3[_k];
                if (cc.pointEqualToPoint(c, pos)) {
                  self.slateDisplaying = a;
                  break;
                }
              }
            }
            if (self.slateDisplaying) {
              var comp = self.slateDisplaying.getComponent(Gem_1.default);
              var damage = [ comp.minDamage(), comp.maxDamage() ];
              self.showDisplaySlate(comp.pos, self.slateDisplaying.name, damage, comp.range(), self.slateDisplaying, comp.icon);
            }
          } else {
            self.slateDisplaying = null;
            self.displayInfoSlate.active = false;
          }
          self.effectSelectTurnOn();
        };
        self.mapController.node.on(cc.Node.EventType.TOUCH_START, clickGemOrStone, self.mapController.node);
        self.mapController.node.on(cc.Node.EventType.TOUCH_END, func, self.mapController.node);
        self.mapController.node.on(cc.Node.EventType.TOUCH_START, func, self.mapController.node);
        self.mapController.node.on(cc.Node.EventType.TOUCH_MOVE, func, self.mapController.node);
        self.mapController.node.on(cc.Node.EventType.TOUCH_CANCEL, func, self.mapController.node);
      };
      GameController.prototype.effectSelectTurnOn = function() {
        if (this.effectSelect.length > 0) {
          for (var _i = 0, _a = this.effectSelect; _i < _a.length; _i++) {
            var a = _a[_i];
            if ("" !== a.name) {
              a.scale = 1;
              a.stopAllActions();
            }
          }
          this.effectSelect = [];
        }
        if (this.listGemsRemoveCombine.length > 0) {
          var scale = void 0;
          var listEffect = [];
          for (var _b = 0, _c = this.listGemsRemoveCombine; _b < _c.length; _b++) {
            var a = _c[_b];
            listEffect.push(a);
          }
          listEffect.push(this.gemDisplaying);
          for (var _d = 0, listEffect_1 = listEffect; _d < listEffect_1.length; _d++) {
            var a = listEffect_1[_d];
            scale = a.scale;
            var rep = cc.repeatForever(cc.sequence(cc.scaleTo(.4, scale + .15), cc.scaleTo(.4, scale - .15)));
            a.runAction(rep);
            this.effectSelect.push(a);
          }
        }
      };
      GameController.prototype.effectSelectTurnOff = function() {
        if (this.effectSelect.length > 0) {
          for (var _i = 0, _a = this.effectSelect; _i < _a.length; _i++) {
            var a = _a[_i];
            if ("" !== a.name) {
              a.scale = 1;
              a.stopAllActions();
            }
          }
          this.effectSelect = [];
        }
      };
      GameController.prototype.isNeedBuild = function() {
        this.blockInputEvent = !this.blockInputEvent;
        var lab = this.btnCreateGem.getChildByName("Label").getComponent(cc.Label);
        if (this.blockInputEvent) {
          lab.string = "Not Build";
          this.showInput.active = false;
        } else lab.string = "Build";
      };
      GameController.prototype.showPathsMove = function() {
        var p = this.path;
        this.gra.clear();
        if (p.length <= 0) return;
        this.gra.lineWidth = .1;
        this.gra.stroke();
        var tempX = p[0][0].x;
        var tempY = p[0][0].y;
        var renderX = 0;
        var renderY = 0;
        this.gra.fillRect(renderX, renderY, this.tileSize, this.tileSize);
        for (var i = 0; i < p.length; i++) for (var j = 0; j < p[i].length; j++) {
          var x = p[i][j].x;
          if (x != tempX) {
            x > tempX ? renderX += this.tileSize : renderX -= this.tileSize;
            tempX = p[i][j].x;
            this.gra.fillRect(renderX, renderY, this.tileSize, this.tileSize);
            continue;
          }
          var y = p[i][j].y;
          if (y != tempY) {
            y > tempY ? renderY -= this.tileSize : renderY += this.tileSize;
            tempY = y;
            this.gra.fillRect(renderX, renderY, this.tileSize, this.tileSize);
            continue;
          }
        }
      };
      GameController.prototype.isCanCreateGem = function(indexAround) {
        var pos = this.mapController.tilePosistion(this.endPos);
        if (pos.y < 0 || pos.x < 0 || pos.x + 1 >= this.row || pos.y + 1 >= this.col) return false;
        for (var _i = 0, indexAround_1 = indexAround; _i < indexAround_1.length; _i++) {
          var index = indexAround_1[_i];
          if (this.tiles[index] && (this.tiles[index].hasGem || this.tiles[index].hasStone || this.tiles[index].hasMile)) return false;
        }
        return true;
      };
      GameController.prototype.createGem = function(indexAround) {
        if (!this.isCompleteBuild) return;
        this.showInput.active = false;
        this.isCompleteBuild = false;
        var pos = this.mapController.tilePosistion(this.endPos);
        var posPixel = this.mapController.pixelPosition(pos);
        var max = this.gemPrefab.length - 1;
        var min = 0;
        var ran = Math.floor(Math.random() * (max - min + 1)) + min;
        var gem;
        var build;
        var creGem = cc.callFunc(function() {
          this.indexGem++;
          gem = cc.instantiate(this.gemPrefab[ran]);
          gem.getComponent(Gem_1.default).pos = pos;
          gem.getComponent(Gem_1.default).gameController = this;
          gem.getComponent(Gem_1.default).currentLevel = InitData_1.default.ranLevelGem(this.levelPlayer);
          gem.getComponent(Gem_1.default).index = this.indexGem;
          gem.getComponent(Gem_1.default).posSquare = [ pos.y * this.row + pos.x, pos.y * this.row + pos.x + 1, (pos.y + 1) * this.row + pos.x, (pos.y + 1) * this.row + pos.x + 1 ];
          gem.setPosition(cc.v2(posPixel.x + this.tileSize / 2, posPixel.y - this.tileSize / 2));
          this.addGemInMap.addChild(gem);
          this.gemsCurrentWay.push(gem);
          this.gems.push(gem);
          for (var _i = 0, indexAround_2 = indexAround; _i < indexAround_2.length; _i++) {
            var index = indexAround_2[_i];
            this.tiles[index].hasGem = true;
            this.tiles[index].hasStone = false;
          }
          gem.opacity = 0;
          gem.runAction(cc.fadeTo(.5, 255));
        }, this);
        var creBuild = cc.callFunc(function() {
          build = cc.instantiate(this.buildCloudPrefab);
          build.setPosition(cc.v2(posPixel.x + this.tileSize / 2, posPixel.y - this.tileSize / 2));
          this.addGemInMap.addChild(build);
        }, this);
        var desBuild = cc.callFunc(function() {
          build.destroy();
        }, this);
        var setHL = cc.callFunc(function() {
          var listHL = this.listHighlight.children;
          for (var i = 0; i < this.gemsCurrentWay.length; i++) {
            listHL[i].active = true;
            listHL[i].position = this.gemsCurrentWay[i].getPosition();
            listHL[i].setPositionY(listHL[i].getPositionY());
          }
          this.countGemCreate++;
          this.isCompleteBuild = true;
        }, this);
        var seq = cc.sequence(creBuild, cc.delayTime(1), creGem, desBuild, cc.delayTime(.5), setHL);
        this.node.runAction(seq);
        if (this.countGemCreate >= 4) {
          this.isNeedBuild();
          this.btnCreateGem.getComponent(cc.Button).interactable = false;
        }
      };
      GameController.prototype.updateListGems = function() {
        var childs = this.addGemInMap.children;
        this.gems = [];
        var length = childs.length;
        for (var i = 0; i < length; i++) {
          var comp = childs[i].getComponent(Gem_1.default);
          if (comp) {
            var gem = childs[i];
            this.gems.push(gem);
          }
        }
      };
      GameController.prototype.updateListSlates = function() {
        var childs = this.addSlateInMap.children;
        this.slates = [];
        var length = childs.length;
        for (var i = 0; i < length; i++) {
          var comp = childs[i].getComponent(Gem_1.default);
          if (comp) {
            var slate = childs[i];
            this.slates.push(slate);
          }
        }
      };
      GameController.prototype.updateListStone = function() {
        var childs = this.addStoneInMap.children;
        this.stones = [];
        var length = childs.length;
        for (var i = 0; i < length; i++) {
          var comp = childs[i].getComponent(Stone_1.default);
          if (comp) {
            var stone = childs[i];
            this.stones.push(stone);
          }
        }
      };
      GameController.prototype.startWay = function() {
        this.isFlyEnemyNextWay = this.dataWaveEnemy[this.countWay].details.moving_fly;
        this.getPaths(this.isFlyEnemyNextWay);
        if (this.isPathCanMove) {
          var delayTime = 1.2;
          this.indexEnemy = 1;
          var cre = cc.callFunc(function() {
            this.createEnemy();
          }, this);
          var openDoor = cc.callFunc(function() {
            this.mileStart.getComponent(cc.Animation).play("OpenDoor");
          }, this);
          var closeDoor = cc.callFunc(function() {
            this.mileStart.getComponent(cc.Animation).play("CloseDoor");
          }, this);
          var checEnd = cc.callFunc(function() {
            this.schedule(this.checkEndWay, 0, cc.macro.REPEAT_FOREVER, 0);
          }, this);
          var seq1 = cc.sequence(cre, cc.delayTime(delayTime));
          var rep = cc.repeat(seq1, this.dataWaveEnemy[this.countWay].details.number);
          var seq2 = cc.sequence(openDoor, cc.delayTime(1), rep, closeDoor, checEnd);
          this.node.runAction(seq2);
          this.isActiveWay = true;
          this.schedule(this.updateListEnemy, 0, cc.macro.REPEAT_FOREVER, 0);
          this.updateUi();
        }
        this.updateListGems();
        this.updateListSlates();
        for (var _i = 0, _a = this.gems; _i < _a.length; _i++) {
          var a = _a[_i];
          a.getComponent(Gem_1.default).isbuff = false;
        }
        for (var _b = 0, _c = this.slates; _b < _c.length; _b++) {
          var a = _c[_b];
          a.getComponent(Gem_1.default).isbuff = false;
        }
        var arrmorThisTurn = this.dataWaveEnemy[this.countWay].details.armor;
        for (var _d = 0, _e = this.gems; _d < _e.length; _d++) {
          var gem = _e[_d];
          var listArrmorGem = gem.getComponent(Gem_1.default).listArmorObj;
          var isSetArmorZero = true;
          for (var i = 0; i < listArrmorGem[0].length; i++) if (listArrmorGem[0][i] === arrmorThisTurn) {
            gem.getComponent(Gem_1.default).armorDmg = listArrmorGem[1][i];
            isSetArmorZero = false;
            continue;
          }
          isSetArmorZero && (gem.getComponent(Gem_1.default).armorDmg = 0);
        }
      };
      GameController.prototype.createEnemy = function() {
        var enemy = cc.instantiate(this.enemyPrefab[this.countWay]);
        var a = this.mapController.pixelPosition(this.mileWays[0]);
        enemy.setPosition(a);
        enemy.getComponent(Enemy_1.default).endPos = this.endMile;
        var pathMove = [];
        var originalScale = enemy.scale;
        for (var i = 0; i < this.path.length; ++i) for (var j = 0; j < this.path[i].length; ++j) {
          var actionPosition = this.mapController.pixelPosition(this.path[i][j]);
          pathMove.push(actionPosition);
        }
        enemy.getComponent(Enemy_1.default).pathMove = pathMove;
        enemy.getComponent(Enemy_1.default).gameController = this;
        enemy.getComponent(Enemy_1.default).hitPrefab = this.hitPrefab;
        enemy.getComponent(Enemy_1.default).index = this.indexEnemy;
        this.addEnemyInMap.addChild(enemy);
        enemy.scale = .1;
        enemy.runAction(cc.scaleTo(2, originalScale));
        this.indexEnemy++;
      };
      GameController.prototype.KeepGem = function(mode) {
        this.displayRangeUi.active = this.displayInfoGem.active = false;
        this.gemDisplaying = null;
        this.slateDisplaying = null;
        this.isKeepGem = true;
        var gemKeep;
        var indexKeep = 0;
        for (var _i = 0, _a = this.listHighlight.children; _i < _a.length; _i++) {
          var a = _a[_i];
          a.active = false;
        }
        for (var i = 0; i < this.gemsCurrentWay.length; i++) {
          var posS = this.gemsCurrentWay[i].getComponent(Gem_1.default).posSquare;
          for (var _b = 0, posS_1 = posS; _b < posS_1.length; _b++) {
            var j = posS_1[_b];
            if (j == this.indexKeepGem) {
              if ("slate" === mode) {
                var square = this.gemsCurrentWay[i].getComponent(Gem_1.default).posSquare;
                for (var i_1 = 0; i_1 < square.length; i_1++) this.tiles[square[i_1]].hasGem = false;
                this.gemsCurrentWay[i].destroy();
              }
              gemKeep = this.gemsCurrentWay.splice(i, 1);
              break;
            }
          }
        }
        for (var j = 0; j < this.gemsCurrentWay.length; j++) {
          var stone = cc.instantiate(this.stonePrefab);
          var square = this.gemsCurrentWay[j].getComponent(Gem_1.default).posSquare;
          stone.setPosition(this.gemsCurrentWay[j].getPosition());
          stone.getComponent(Stone_1.default).posSquare = square;
          stone.getComponent(Stone_1.default).gameController = this;
          stone.getComponent(Stone_1.default).pos = this.gemsCurrentWay[j].getComponent(Gem_1.default).pos;
          this.addStoneInMap.addChild(stone);
          for (var i = 0; i < square.length; i++) {
            this.tiles[square[i]].hasGem = false;
            this.tiles[square[i]].hasStone = true;
          }
          this.gemsCurrentWay[j].destroy();
        }
        this.gemsCurrentWay = [];
        this.effectSelectTurnOff();
        this.startWay();
      };
      GameController.prototype.updateUi = function() {
        this.roundUI.string = "Round : " + this.round.toString();
        this.enemysWayUI.string = "Enemy : " + this.dataWaveEnemy[this.countWay].details.number.toString();
        this.hpUI.string = "Hp : " + this.hp.toString();
        this.goldUI.string = "Gold : " + this.gold.toString();
        this.levelUI.string = "Level : " + this.levelPlayer.toString();
        this.displayRangeUi.setSiblingIndex(this.mapController.node.childrenCount - 1);
      };
      GameController.prototype.resetWay = function() {
        this.unscheduleAllCallbacks();
        this.countWay++;
        this.countGemCreate = 0;
        this.btnCreateGem.getComponent(cc.Button).interactable = true;
        this.isEndWay = false;
        this.isActiveWay = false;
        this.countGemCreate = 0;
        this.isKeepGem = false;
        this.isPathCanMove = false;
        this.updateUi();
      };
      GameController.prototype.updateListEnemy = function() {
        this.enemys = [];
        var childs = this.addEnemyInMap.children;
        var length = childs.length;
        for (var i = 0; i < length; i++) {
          var comp = childs[i].getComponent(Enemy_1.default);
          comp && !comp.isDie && this.enemys.push(childs[i]);
        }
      };
      GameController.prototype.checkEndWay = function() {
        if (this.isActiveWay && 0 == this.enemys.length) {
          this.isEndWay = true;
          this.round++;
          this.resetWay();
        }
      };
      GameController.prototype.showDisplaySlate = function(pos, name, damage, range, slate, icon) {
        this.slateDisplaying = slate;
        this.displayInfoSlate.active = true;
        var posPixel = this.mapController.pixelPosition(pos);
        var iconDisplay = this.displayInfoSlate.getChildByName("icon").getComponent(cc.Sprite);
        this.displayRangeUi.setPosition(cc.v2(posPixel.x + this.tileSize / 2, posPixel.y - this.tileSize / 2));
        var nameDisplay = this.displayInfoSlate.getChildByName("stats").getChildByName("Name").getComponent(cc.Label);
        var damageDisplay = this.displayInfoSlate.getChildByName("stats").getChildByName("Damage").getComponent(cc.Label);
        iconDisplay.spriteFrame = icon;
        nameDisplay.string = name;
        damage[0] != damage[1] ? damageDisplay.string = "Damage : " + damage[0] + " - " + damage[1] : damageDisplay.string = "Damage : " + damage[0];
      };
      GameController.prototype.showDisplayGem = function(pos, name, damage, range, gem, icon) {
        this.gemDisplaying = gem;
        this.displayRangeUi.active = this.displayInfoGem.active = true;
        var posPixel = this.mapController.pixelPosition(pos);
        var iconDisplay = this.displayInfoGem.getChildByName("icon").getComponent(cc.Sprite);
        this.displayRangeUi.setPosition(cc.v2(posPixel.x + this.tileSize / 2, posPixel.y - this.tileSize / 2));
        var nameDisplay = this.displayInfoGem.getChildByName("stats").getChildByName("Name").getComponent(cc.Label);
        var damageDisplay = this.displayInfoGem.getChildByName("stats").getChildByName("Damage").getComponent(cc.Label);
        iconDisplay.spriteFrame = icon;
        this.gemDisplaying.getComponent(Gem_1.default).isCombined ? nameDisplay.string = name : nameDisplay.string = gem.name + " - " + name;
        damage[0] != damage[1] ? damageDisplay.string = "Damage : " + damage[0] + " - " + damage[1] : damageDisplay.string = "Damage : " + damage[0];
        var combineBtn = this.displayRangeUi.getChildByName("Combine");
        combineBtn.active = false;
        this.displayRangeUi.getChildByName("Slate").active = false;
        var downgradeBtn = this.displayRangeUi.getChildByName("Downgrade");
        downgradeBtn.active = false;
        var keepBtn = this.displayRangeUi.getChildByName("Keep");
        keepBtn.active = false;
        var upgradeBtn = this.displayRangeUi.getChildByName("Upgrade");
        upgradeBtn.active = false;
        this.displayRangeUi.setContentSize(2 * range - gem.height / 2, 2 * range - gem.height / 2);
        var checkLV = this.gemDisplaying.getComponent(Gem_1.default).listLevelObj.length;
        var currentLV = this.gemDisplaying.getComponent(Gem_1.default).currentLevel;
        if (this.gemDisplaying.getComponent(Gem_1.default).isCombined) {
          (currentLV >= 1 || currentLV <= checkLV - 1) && (upgradeBtn.active = true);
          if (currentLV == checkLV) {
            upgradeBtn.active = true;
            upgradeBtn.getComponent(cc.Button).interactable = false;
            var stringLabel = upgradeBtn.getChildByName("label").getComponent(cc.Label);
            stringLabel.string = "Max Level";
          }
        } else this.checkGemBasicUpgrade() && (currentLV >= 1 || currentLV <= checkLV - 1) && (upgradeBtn.active = true);
        if (5 == this.countGemCreate || 0 == this.countGemCreate) {
          5 == this.countGemCreate && !this.isKeepGem && this.checkGemInGemsCurrentWay(this.gemDisplaying) && (keepBtn.active = true);
          !this.isKeepGem && this.gemDisplaying.getComponent(Gem_1.default).currentLevel > 1 && this.checkGemInGemsCurrentWay(this.gemDisplaying) && !this.gemDisplaying.getComponent(Gem_1.default).isCombined && (downgradeBtn.active = true);
          if (this.gemDisplaying.getComponent(Gem_1.default).isCombined) combineBtn.active = false; else {
            var isNeedCheck = true;
            5 != this.countGemCreate || this.checkGemInGemsCurrentWay(this.gemDisplaying) || (isNeedCheck = false);
            if (isNeedCheck && this.checkCombineGem()) {
              combineBtn.active = true;
              var stringLabel = combineBtn.getChildByName("label").getComponent(cc.Label);
              stringLabel.string = this.gemCombine.Name.toString();
            }
          }
          this.listSlateCanCombine = [];
          if (this.checkSlateCombine()) {
            var arraySlateBtn = this.displayRangeUi.getChildByName("Slate").getChildByName("arr").children;
            this.displayRangeUi.getChildByName("Slate").active = true;
            for (var _i = 0, arraySlateBtn_1 = arraySlateBtn; _i < arraySlateBtn_1.length; _i++) {
              var a = arraySlateBtn_1[_i];
              a.active = false;
            }
            if (arraySlateBtn.length < this.listSlateCanCombine.length) {
              var numOfCreate = this.listSlateCanCombine.length - arraySlateBtn.length;
              for (var i = 0; i < numOfCreate; i++) {
                var slateClone = cc.instantiate(arraySlateBtn[0]);
                slateClone.setPosition(cc.v2(0, 0));
                this.displayRangeUi.getChildByName("Slate").getChildByName("arr").addChild(slateClone);
              }
            }
            arraySlateBtn = this.displayRangeUi.getChildByName("Slate").getChildByName("arr").children;
            for (var i = 0; i < this.listSlateCanCombine.length; i++) arraySlateBtn[i].name = this.listSlateCanCombine[i].toString();
            for (var i = 0; i < this.listSlateCanCombine.length; i++) {
              arraySlateBtn[i].active = true;
              var stringLabel = arraySlateBtn[i].getChildByName("label").getComponent(cc.Label);
              stringLabel.string = this.listSlateCanCombine[i].toString();
            }
          }
        }
      };
      GameController.prototype.checkSlateCombine = function() {
        var gemCurrentCheck = this.gemDisplaying;
        var indexGemDisplay = gemCurrentCheck.getComponent(Gem_1.default).index;
        var isHasSlateInGemDisplay = false;
        var pos = this.gemDisplaying.getComponent(Gem_1.default).pos;
        var indexAround = [ pos.y * this.row + pos.x, pos.y * this.row + pos.x + 1, (pos.y + 1) * this.row + pos.x, (pos.y + 1) * this.row + pos.x + 1 ];
        for (var _i = 0, indexAround_3 = indexAround; _i < indexAround_3.length; _i++) {
          var a = indexAround_3[_i];
          if (this.tiles[a].hasSlate) {
            isHasSlateInGemDisplay = true;
            break;
          }
        }
        if (isHasSlateInGemDisplay) return false;
        var listCanCombine = [];
        var type = gemCurrentCheck.getComponent(Gem_1.default).Type();
        for (var _a = 0, _b = this.formulaCombineSlate; _a < _b.length; _a++) {
          var a = _b[_a];
          if (a.List[0][0].toString().toLocaleLowerCase() === gemCurrentCheck.name.toString().toLocaleLowerCase() && (a.List[0][1].toString().toLocaleLowerCase() === type.toString().toLocaleLowerCase() || "" === a.List[0][1].toString().toLocaleLowerCase())) {
            listCanCombine.push(a);
            continue;
          }
          for (var _c = 0, _d = a.List[1]; _c < _d.length; _c++) {
            var b = _d[_c];
            if (b[0].toString().toLocaleLowerCase() === gemCurrentCheck.name.toString().toLocaleLowerCase() && (b[1].toString().toLocaleLowerCase() === type.toString().toLocaleLowerCase() || "" === b[1].toString().toLocaleLowerCase())) {
              listCanCombine.push(a);
              continue;
            }
          }
        }
        if (listCanCombine.length < 0) return false;
        var listGemsToCheck = [];
        if (this.isKeepGem || !this.isKeepGem && 0 == this.countGemCreate) {
          this.updateListGems();
          for (var _e = 0, _f = this.gems; _e < _f.length; _e++) {
            var a = _f[_e];
            listGemsToCheck.push(a);
          }
        } else for (var _g = 0, _h = this.gemsCurrentWay; _g < _h.length; _g++) {
          var a = _h[_g];
          listGemsToCheck.push(a);
        }
        var listSlateCanCombine = [];
        for (var k = 0; k < listCanCombine.length; k++) {
          var count = listCanCombine[k].List.length;
          var tempCount = count;
          var countTEqual1 = 0;
          var indexC = [];
          for (var t = 0; t < listCanCombine[k].List.length; t++) if (0 == t) for (var i = 0; i < listGemsToCheck.length; i++) {
            var typeCheck = listGemsToCheck[i].getComponent(Gem_1.default).Type();
            if (listGemsToCheck[i].name.toString().toLocaleLowerCase() == listCanCombine[k].List[t][0].toString().toLocaleLowerCase() && (typeCheck.toLocaleLowerCase() == listCanCombine[k].List[t][1].toString().toLocaleLowerCase() || "" == listCanCombine[k].List[t][1].toLocaleLowerCase())) {
              var isCanCheck = true;
              for (var _j = 0, indexC_1 = indexC; _j < indexC_1.length; _j++) {
                var c = indexC_1[_j];
                if (c == listGemsToCheck[i].getComponent(Gem_1.default).index) {
                  isCanCheck = false;
                  break;
                }
              }
              if (isCanCheck) {
                count--;
                indexC.push(listGemsToCheck[i].getComponent(Gem_1.default).index);
                break;
              }
            }
          } else {
            if (count == tempCount) break;
            for (var r = 0; r < listCanCombine[k].List[1].length; r++) for (var i = 0; i < listGemsToCheck.length; i++) {
              var typeCheck = listGemsToCheck[i].getComponent(Gem_1.default).Type();
              if (listGemsToCheck[i].name.toString().toLocaleLowerCase() == listCanCombine[k].List[t][r][0].toString().toLocaleLowerCase() && (typeCheck.toLocaleLowerCase() == listCanCombine[k].List[t][r][1].toString().toLocaleLowerCase() || "" == listCanCombine[k].List[t][r][1].toLocaleLowerCase())) {
                var isCanCheck = true;
                for (var _k = 0, indexC_2 = indexC; _k < indexC_2.length; _k++) {
                  var c = indexC_2[_k];
                  if (c == listGemsToCheck[i].getComponent(Gem_1.default).index) {
                    isCanCheck = false;
                    break;
                  }
                }
                if (isCanCheck) {
                  countTEqual1++;
                  indexC.length < 2 && indexC.push(listGemsToCheck[i].getComponent(Gem_1.default).index);
                  indexC[1] > listGemsToCheck[i].getComponent(Gem_1.default).index && (indexC[1] = listGemsToCheck[i].getComponent(Gem_1.default).index);
                  break;
                }
              }
            }
          }
          countTEqual1 > 0 && count--;
          0 == count && listSlateCanCombine.push(listCanCombine[k].Name);
        }
        if (listSlateCanCombine.length > 0) {
          this.listSlateCanCombine = listSlateCanCombine;
          return true;
        }
        return false;
      };
      GameController.prototype.createSlate = function(event, customEventData) {
        this.indexGem++;
        var pos = this.gemDisplaying.getComponent(Gem_1.default).pos;
        var posPixel = this.mapController.pixelPosition(pos);
        var nodeName = event.target.name;
        var slate;
        for (var i = 0; i < this.slateCombinePrefab.length; i++) {
          slate = cc.instantiate(this.slateCombinePrefab[i]);
          if (slate.name.toLocaleLowerCase() === nodeName.toLocaleLowerCase()) break;
        }
        slate.getComponent(Gem_1.default).gameController = this;
        slate.getComponent(Gem_1.default).currentLevel = 1;
        slate.getComponent(Gem_1.default).index = this.indexGem;
        slate.getComponent(Gem_1.default).posSquare = this.gemDisplaying.getComponent(Gem_1.default).posSquare;
        slate.getComponent(Gem_1.default).pos = this.gemDisplaying.getComponent(Gem_1.default).pos;
        slate.setPosition(this.gemDisplaying.getPosition());
        this.addSlateInMap.addChild(slate);
        var indexAround = [ pos.y * this.row + pos.x, pos.y * this.row + pos.x + 1, (pos.y + 1) * this.row + pos.x, (pos.y + 1) * this.row + pos.x + 1 ];
        for (var _i = 0, indexAround_4 = indexAround; _i < indexAround_4.length; _i++) {
          var a = indexAround_4[_i];
          this.tiles[a].hasSlate = true;
        }
        this.KeepGem("slate");
        this.getPaths(false);
        this.showPathsMove();
      };
      GameController.prototype.checkCombineGem = function() {
        var gemCurrentCheck = this.gemDisplaying;
        this.listGemsRemoveCombine = [];
        this.gemKeepCombine = null;
        this.gemCombine = null;
        if (!gemCurrentCheck) return false;
        var listCanCombine = [];
        var type = gemCurrentCheck.getComponent(Gem_1.default).Type();
        for (var _i = 0, _a = this.formulaCombineGem; _i < _a.length; _i++) {
          var a = _a[_i];
          for (var _b = 0, _c = a.List; _b < _c.length; _b++) {
            var b = _c[_b];
            b[0].toString().toLocaleLowerCase() !== gemCurrentCheck.name.toString().toLocaleLowerCase() || b[1].toString().toLocaleLowerCase() !== type.toString().toLocaleLowerCase() && "" !== b[1].toString().toLocaleLowerCase() || listCanCombine.push(a.Name);
          }
        }
        if (listCanCombine.length <= 0) return false;
        var listGemsToCheck = [];
        if (this.isKeepGem || !this.isKeepGem && 0 == this.countGemCreate) {
          this.updateListGems();
          for (var _d = 0, _e = this.gems; _d < _e.length; _d++) {
            var a = _e[_d];
            listGemsToCheck.push(a);
          }
        } else for (var _f = 0, _g = this.gemsCurrentWay; _f < _g.length; _f++) {
          var a = _g[_f];
          listGemsToCheck.push(a);
        }
        var listDataCombine = [];
        for (var i = 0; i < this.formulaCombineGem.length; i++) listDataCombine.push(this.formulaCombineGem[i]);
        var checkObj = [];
        for (var _h = 0, listDataCombine_1 = listDataCombine; _h < listDataCombine_1.length; _h++) {
          var a = listDataCombine_1[_h];
          var str1 = a.Name.toString().toLocaleLowerCase();
          for (var _j = 0, listCanCombine_1 = listCanCombine; _j < listCanCombine_1.length; _j++) {
            var b = listCanCombine_1[_j];
            var str2 = b.toLocaleLowerCase();
            if (str1 === str2) {
              var Name = a.Name;
              var List = void 0;
              3 == a.List.length ? List = [ a.List[0], a.List[1], a.List[2] ] : 4 == a.List.length && (List = [ a.List[0], a.List[1], a.List[2], a.List[3] ]);
              var tempA = {
                Name: Name,
                List: List
              };
              checkObj.push(tempA);
              break;
            }
          }
        }
        var indexKCanCombine = 0;
        for (var k = 0; k < checkObj.length; k++) {
          var count = checkObj[k].List.length;
          if (listGemsToCheck.length < count) break;
          var indexC = [];
          for (var _k = 0, _l = checkObj[k].List; _k < _l.length; _k++) {
            var a = _l[_k];
            for (var i = 0; i < listGemsToCheck.length; i++) {
              var typeCheck = listGemsToCheck[i].getComponent(Gem_1.default).Type();
              if (listGemsToCheck[i].name.toString().toLocaleLowerCase() == a[0].toString().toLocaleLowerCase() && (typeCheck.toLocaleLowerCase() == a[1].toString().toLocaleLowerCase() || "" == a[1].toLocaleLowerCase())) {
                var isCanCheck = true;
                for (var _m = 0, indexC_3 = indexC; _m < indexC_3.length; _m++) {
                  var c = indexC_3[_m];
                  if (c == listGemsToCheck[i].getComponent(Gem_1.default).index) {
                    isCanCheck = false;
                    break;
                  }
                }
                if (isCanCheck) {
                  count--;
                  indexKCanCombine = k;
                  indexC.push(listGemsToCheck[i].getComponent(Gem_1.default).index);
                  break;
                }
              }
            }
          }
          if (0 == count) {
            this.gemCombine = checkObj[indexKCanCombine];
            this.gemKeepCombine = gemCurrentCheck;
            var nameGemKeepCombine = this.gemKeepCombine.name.toLocaleLowerCase();
            var typeGemKeepCombine = this.gemKeepCombine.getComponent(Gem_1.default).Type().toLocaleLowerCase();
            for (var h = 0; h < listGemsToCheck.length; h++) {
              var in2 = this.gemKeepCombine.getComponent(Gem_1.default).index;
              var in1 = listGemsToCheck[h].getComponent(Gem_1.default).index;
              if (in1 == in2) {
                listGemsToCheck.splice(h, 1);
                var isNeed = true;
                for (var j = 0; j < checkObj[indexKCanCombine].List.length; j++) {
                  var nameCheckObj = checkObj[indexKCanCombine].List[j][0].toLocaleLowerCase();
                  var typeCheckObj = checkObj[indexKCanCombine].List[j][1].toLocaleLowerCase();
                  if (nameCheckObj === nameGemKeepCombine && typeCheckObj === typeGemKeepCombine) {
                    checkObj[indexKCanCombine].List.splice(j, 1);
                    isNeed = false;
                    break;
                  }
                }
                if (isNeed) for (var j = 0; j < checkObj[indexKCanCombine].List.length; j++) {
                  var nameCheckObj = checkObj[indexKCanCombine].List[j][0].toLocaleLowerCase();
                  var typeCheckObj = checkObj[indexKCanCombine].List[j][1].toLocaleLowerCase();
                  if (nameCheckObj === nameGemKeepCombine && "" === typeCheckObj) {
                    checkObj[indexKCanCombine].List.splice(j, 1);
                    isNeed = false;
                    break;
                  }
                }
                break;
              }
            }
            for (var j = 0; j < checkObj[indexKCanCombine].List.length; j++) {
              var nameCheckObj = checkObj[indexKCanCombine].List[j][0].toLocaleLowerCase();
              var typeCheckObj = checkObj[indexKCanCombine].List[j][1].toLocaleLowerCase();
              for (var i = listGemsToCheck.length - 1; i > -1; i--) {
                var nameListGemsToCheck = listGemsToCheck[i].name.toLocaleLowerCase();
                var typeListGemsToCheck = listGemsToCheck[i].getComponent(Gem_1.default).Type().toLocaleLowerCase();
                if (nameCheckObj === nameListGemsToCheck && (typeCheckObj === typeListGemsToCheck || "" === typeCheckObj)) {
                  var isNeedPush = true;
                  if (isNeedPush) {
                    this.listGemsRemoveCombine.push(listGemsToCheck[i]);
                    listGemsToCheck.splice(i, 1);
                    break;
                  }
                }
              }
            }
            return true;
          }
        }
        return false;
      };
      GameController.prototype.checkGemBasicUpgrade = function() {
        if (this.countGemCreate < 5) return;
        var listCheck = this.gemsCurrentWay;
        var a = this.gemDisplaying;
        for (var _i = 0, listCheck_1 = listCheck; _i < listCheck_1.length; _i++) {
          var b = listCheck_1[_i];
          if (a.getComponent(Gem_1.default).index == b.getComponent(Gem_1.default).index) continue;
          if (a.name.toLocaleLowerCase() === b.name.toLocaleLowerCase() && a.getComponent(Gem_1.default).Type().toLocaleLowerCase() == b.getComponent(Gem_1.default).Type().toLocaleLowerCase()) return true;
        }
        return false;
      };
      GameController.prototype.checkGemInGemsCurrentWay = function(gem) {
        for (var _i = 0, _a = this.gemsCurrentWay; _i < _a.length; _i++) {
          var a = _a[_i];
          if ("" == a.name) continue;
          var b = a.getComponent(Gem_1.default).pos;
          var square = [ cc.v2(b.x, b.y), cc.v2(b.x + 1, b.y), cc.v2(b.x, b.y + 1), cc.v2(b.x + 1, b.y + 1) ];
          for (var _b = 0, square_4 = square; _b < square_4.length; _b++) {
            var c = square_4[_b];
            var gemPos = gem.getComponent(Gem_1.default).pos;
            if (cc.pointEqualToPoint(c, gemPos)) return true;
          }
        }
        return false;
      };
      GameController.prototype.takeDamage = function(damageEnemy) {
        this.hp -= damageEnemy;
        if (this.hp <= 0) {
          this.hp = 0;
          this.updateUi();
          console.log("End Game");
        }
        this.updateUi();
      };
      GameController.prototype.downgradeGem = function() {
        var gemComp = this.gemDisplaying.getComponent(Gem_1.default);
        gemComp.currentLevel--;
        var pos = gemComp.pos;
        this.indexKeepGem = pos.y * this.row + pos.x;
        this.KeepGem("gem");
      };
      GameController.prototype.removeGem = function(gemRemove) {
        var gem;
        var name = gemRemove.name;
        gem = name ? gemRemove : this.gemDisplaying;
        if (this.checkGemInGemsCurrentWay(gem)) for (var i = 0; i < this.gemsCurrentWay.length; i++) this.gemsCurrentWay[i].getComponent(Gem_1.default).index == gemRemove.getComponent(Gem_1.default).index && this.gemsCurrentWay.splice(i, 1);
        var square = gem.getComponent(Gem_1.default).posSquare;
        var stone = cc.instantiate(this.stonePrefab);
        stone.setPosition(gem.getPosition());
        stone.getComponent(Stone_1.default).posSquare = square;
        stone.getComponent(Stone_1.default).gameController = this;
        stone.getComponent(Stone_1.default).pos = gem.getComponent(Gem_1.default).pos;
        this.addGemInMap.addChild(stone);
        for (var i = 0; i < square.length; i++) {
          this.tiles[square[i]].hasGem = false;
          this.tiles[square[i]].hasStone = true;
        }
        gem.getComponent(GemOpal_1.default) && gem.getComponent(GemOpal_1.default).removedBuffGemsAround();
        gem.destroy();
        this.displayRangeUi.active = this.displayInfoGem.active = false;
      };
      GameController.prototype.removeStone = function(stoneRemove) {
        var stoneNode;
        var name = stoneRemove.name;
        stoneNode = name ? stoneRemove : this.stonePick;
        var square = stoneNode.getComponent(Stone_1.default).posSquare;
        for (var i = 0; i < square.length; i++) {
          this.tiles[square[i]].hasGem = false;
          this.tiles[square[i]].hasStone = false;
        }
        stoneNode.destroy();
        this.btnRemoveStone.active = false;
        this.getPaths(false);
        this.showPathsMove();
      };
      GameController.prototype.CombineGem = function() {
        this.displayRangeUi.active = this.displayInfoGem.active = false;
        this.createGemCombine(this.gemKeepCombine, this.gemCombine.Name);
        for (var _i = 0, _a = this.listGemsRemoveCombine; _i < _a.length; _i++) {
          var a = _a[_i];
          a.getComponent(Gem_1.default).index != this.gemKeepCombine.getComponent(Gem_1.default).index && this.removeGem(a);
        }
        this.countGemCreate > 0 && this.KeepGem("gem");
      };
      GameController.prototype.createGemCombine = function(oldGem, nameNewGem) {
        this.indexGem++;
        var newGem;
        for (var _i = 0, _a = this.gemCombinePrefab; _i < _a.length; _i++) {
          var a = _a[_i];
          newGem = cc.instantiate(a);
          if (newGem.name.toLocaleLowerCase() === nameNewGem.toLocaleLowerCase()) break;
        }
        newGem.name = nameNewGem;
        newGem.getComponent(Gem_1.default).pos = oldGem.getComponent(Gem_1.default).pos;
        newGem.getComponent(Gem_1.default).gameController = this;
        newGem.getComponent(Gem_1.default).currentLevel = 1;
        newGem.getComponent(Gem_1.default).index = this.indexGem;
        newGem.getComponent(Gem_1.default).isCombined = true;
        newGem.getComponent(Gem_1.default).posSquare = oldGem.getComponent(Gem_1.default).posSquare;
        newGem.setPosition(oldGem.getPosition());
        this.addGemInMap.addChild(newGem);
        newGem.getChildByName("Label").getComponent(cc.Label).string = nameNewGem.toString();
        this.gems.push(newGem);
        var pos = newGem.getComponent(Gem_1.default).pos;
        this.indexKeepGem = pos.y * this.row + pos.x;
        if (!this.isKeepGem && 5 == this.countGemCreate) {
          this.gemsCurrentWay.push(newGem);
          for (var i = 0; i < this.gemsCurrentWay.length; i++) if (oldGem.getComponent(Gem_1.default).index == this.gemsCurrentWay[i].getComponent(Gem_1.default).index) {
            this.gemsCurrentWay.splice(i, 1);
            break;
          }
        }
        oldGem.destroy();
        this.effectSelect = [];
      };
      GameController.prototype.checkTouchMap = function() {
        if (this.touchStart && this.touchMove) {
          var move = cc.pSub(this.touchCurrentPos, this.touchStartPos);
          move.x /= 3;
          move.y /= 3;
          var offSetOutMap = 500;
          var rangeX = this.mapController.node.width - this.targetCamera.width;
          if (this.targetCamera.x >= -offSetOutMap && this.targetCamera.x <= rangeX + offSetOutMap) {
            this.targetCamera.x -= move.x;
            this.targetCamera.x < -offSetOutMap && (this.targetCamera.x = -offSetOutMap);
            this.targetCamera.x > rangeX + offSetOutMap && (this.targetCamera.x = rangeX + offSetOutMap);
          }
          var rangeY = this.targetCamera.height - this.mapController.node.height;
          if (this.targetCamera.y <= 0 + offSetOutMap && this.targetCamera.y >= rangeY - offSetOutMap) {
            this.targetCamera.y -= move.y;
            this.targetCamera.y > 0 + offSetOutMap && (this.targetCamera.y = offSetOutMap);
            this.targetCamera.y < rangeY - offSetOutMap && (this.targetCamera.y = rangeY - offSetOutMap);
          }
        }
      };
      GameController.prototype.isKeepBuild = function(event, customEventData) {
        "ok" === customEventData.toString() && this.createGem(this.indexAround);
        if ("cancel" === customEventData.toString()) {
          this.showInput.active = false;
          this.getPaths(false);
          this.showPathsMove();
        }
        this.btnIsKeepBuild.active = false;
      };
      GameController.prototype.upgradeLevelGem = function() {
        if (!this.gemDisplaying) return;
        this.displayRangeUi.active = this.displayInfoGem.active = false;
        var gemComp = this.gemDisplaying.getComponent(Gem_1.default);
        gemComp.currentLevel++;
        var pos = gemComp.pos;
        this.indexKeepGem = pos.y * this.row + pos.x;
        this.gemDisplaying.getComponent(Gem_1.default).isCombined || this.KeepGem("gem");
      };
      GameController.prototype.upgradeLevelHero = function() {
        if (this.levelPlayer < 8) {
          this.levelPlayer++;
          this.gold -= 20;
          this.updateUi();
        }
      };
      GameController.prototype.update = function(dt) {
        this.checkTouchMap();
      };
      __decorate([ property(MapController_1.default) ], GameController.prototype, "mapController", void 0);
      __decorate([ property(cc.Prefab) ], GameController.prototype, "gemPrefab", void 0);
      __decorate([ property(cc.Prefab) ], GameController.prototype, "enemyPrefab", void 0);
      __decorate([ property(cc.Prefab) ], GameController.prototype, "stonePrefab", void 0);
      __decorate([ property(cc.Prefab) ], GameController.prototype, "milePrefab", void 0);
      __decorate([ property(cc.Prefab) ], GameController.prototype, "mileStartPrefab", void 0);
      __decorate([ property(cc.Prefab) ], GameController.prototype, "hitPrefab", void 0);
      __decorate([ property(cc.Prefab) ], GameController.prototype, "buildCloudPrefab", void 0);
      __decorate([ property(cc.Prefab) ], GameController.prototype, "combineListPrefab", void 0);
      __decorate([ property(cc.Prefab) ], GameController.prototype, "gemCombinePrefab", void 0);
      __decorate([ property(cc.Prefab) ], GameController.prototype, "slateCombinePrefab", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "blockInputUi", void 0);
      __decorate([ property(ManagerUi_1.default) ], GameController.prototype, "managerUi", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "shopUi", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "playerUi", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "showInput", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "displayInfoGem", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "displayInfoSlate", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "btnIsKeepBuild", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "btnCreateGem", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "btnStartWay", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "btnRemoveStone", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "btnRemoveGem", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "btnCombine", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "listHighlight", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "displayRangeUi", void 0);
      __decorate([ property(cc.Label) ], GameController.prototype, "notifica", void 0);
      __decorate([ property(cc.Graphics) ], GameController.prototype, "gra", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "infoCombine", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "targetCamera", void 0);
      GameController = __decorate([ ccclass ], GameController);
      return GameController;
    }(cc.Component);
    exports.default = GameController;
    cc._RF.pop();
  }, {
    "./Enemy": "Enemy",
    "./Gem": "Gem",
    "./GemOpal": "GemOpal",
    "./InitData": "InitData",
    "./ManagerUi": "ManagerUi",
    "./MapController": "MapController",
    "./Stone": "Stone",
    "./Tile": "Tile"
  } ],
  GemAmethyst: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2085fPPpbhAMb3lxsnSblLH", "GemAmethyst");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Amethyst = function(_super) {
      __extends(Amethyst, _super);
      function Amethyst() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        return _this;
      }
      Amethyst.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        this.listLevelObj = this.gameController.dataGem.Amethyst.level;
        this.listArmorObj = this.gameController.dataGem.Amethyst.arrmor;
      };
      Amethyst.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("AmethystShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      Amethyst.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], Amethyst.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], Amethyst.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], Amethyst.prototype, "img", void 0);
      Amethyst = __decorate([ ccclass ], Amethyst);
      return Amethyst;
    }(Gem_1.default);
    exports.default = Amethyst;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemAquamarine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "04995Dd/VZOmZ9CV9EonRpc", "GemAquamarine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemAquamarine = function(_super) {
      __extends(GemAquamarine, _super);
      function GemAquamarine() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        return _this;
      }
      GemAquamarine.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        this.listLevelObj = this.gameController.dataGem.Aquamarine.level;
        this.listArmorObj = this.gameController.dataGem.Aquamarine.arrmor;
      };
      GemAquamarine.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("AquamarineShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemAquamarine.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], GemAquamarine.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemAquamarine.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemAquamarine.prototype, "img", void 0);
      GemAquamarine = __decorate([ ccclass ], GemAquamarine);
      return GemAquamarine;
    }(Gem_1.default);
    exports.default = GemAquamarine;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemBlackOpal: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31d90h9Q1BOe5S5rDv/uR/2", "GemBlackOpal");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemBlackOpal = function(_super) {
      __extends(GemBlackOpal, _super);
      function GemBlackOpal() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      GemBlackOpal.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
      };
      GemBlackOpal.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        if (!this.isbuff && this.buffDMG() > 0) {
          this.checkGemAround(this.rangeBuff());
          this.listGemAround.length > 0 && this.buffGemsAround();
          this.isbuff = true;
        }
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemBlackOpal.prototype.buffGemsAround = function() {
        for (var _i = 0, _a = this.listGemAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = this.buffDMG();
          a.getComponent(Gem_1.default).incrDMG < c && (a.getComponent(Gem_1.default).incrDMG = c);
        }
      };
      GemBlackOpal.prototype.removedBuffGemsAround = function() {
        for (var _i = 0, _a = this.listGemAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = this.buffSDP();
          (a.getComponent(Gem_1.default).incrDMG = c) && (a.getComponent(Gem_1.default).incrDMG = 0);
        }
      };
      GemBlackOpal.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], GemBlackOpal.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemBlackOpal.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemBlackOpal.prototype, "img", void 0);
      GemBlackOpal = __decorate([ ccclass ], GemBlackOpal);
      return GemBlackOpal;
    }(Gem_1.default);
    exports.default = GemBlackOpal;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemBloodStone: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f745fOZaHxHOaY6SKOWf8ks", "GemBloodStone");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Enemy_1 = require("./Enemy");
    var Bullet_1 = require("./Bullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemBloodStone = function(_super) {
      __extends(GemBloodStone, _super);
      function GemBloodStone() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.isCdToDeal = true;
        _this.targettedToDeal = null;
        _this.listEnemeyDps = [];
        _this.collider = null;
        return _this;
      }
      GemBloodStone.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
        this.collider = this.node.getComponent(cc.CircleCollider);
        this.collider.enabled = false;
      };
      GemBloodStone.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        if (1 == this.currentLevel) {
          this.checkEnemyAroundDPS();
          this.dpsSkill();
        }
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        2 == this.currentLevel && this.listEnemey.length > 0 && this.isCdToDeal && this.dealDmgTargetted();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.playAdditive("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
              this.targettedToDeal = this.targetEnemy;
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemBloodStone.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).chanceCrit = this.chanceCrit();
        bullet.getComponent(Bullet_1.default).crit = this.critDamage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      GemBloodStone.prototype.dealDmgTargetted = function() {
        this.isCdToDeal = false;
        if (this.chance(10)) {
          var listTemp = [];
          if (this.listEnemey.length > 3) {
            var numRemove = this.listEnemey.length - 3;
            for (var i = 0; i < numRemove; i++) {
              var tempIndex = 0;
              for (var j = 0; j < this.listEnemey.length; j++) {
                var temp = this.listEnemey[tempIndex];
                var dis = cc.pDistance(temp.getPosition(), this.gameController.endMile);
                var newDis = cc.pDistance(this.listEnemey[j].getPosition(), this.gameController.endMile);
                if (newDis > dis) {
                  dis = newDis;
                  temp = this.listEnemey[j];
                  tempIndex = j;
                }
              }
              this.listEnemey.splice(tempIndex, 1);
            }
          }
          for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
            var a = _a[_i];
            var dmg = 450;
            var dmgArmor = 450 * this.armorDmg;
            var incr = Math.round(dmg * this.incrDMG / 100);
            var totalDMG = Math.round(dmg + incr + dmgArmor);
            a.getComponent(Enemy_1.default).takeDame(totalDMG, this.index);
          }
        }
        var act1 = cc.callFunc(function() {
          this.isCdToDeal = true;
        }, this);
        this.node.runAction(cc.sequence(cc.delayTime(1), act1));
      };
      GemBloodStone.prototype.chance = function(per) {
        var max = 1 / (per / 100);
        var min = 1;
        var ran = Math.floor(Math.random() * (max - min + 1)) + min;
        return 1 == ran;
      };
      GemBloodStone.prototype.dpsSkill = function() {
        if (this.listEnemeyDps.length > 0 && this.isCdDps) {
          var dps = this.node.getChildByName("dps");
          this.isCdDps = false;
          var rangeDPS = this.rangeDPS();
          dps.setContentSize(2 * rangeDPS, 2 * rangeDPS);
          this.collider.radius = rangeDPS;
          var act1 = cc.callFunc(function() {
            this.animState = this.ani.playAdditive("dpsStarRuby");
          }, this);
          var act2 = cc.callFunc(function() {
            this.collider.enabled = true;
          }, this);
          var act3 = cc.callFunc(function() {
            this.collider.enabled = false;
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdDps = true;
          }, this);
          this.node.runAction(cc.sequence(act1, cc.delayTime(1), act2, cc.delayTime(.05), act3, cdskill));
        }
      };
      GemBloodStone.prototype.checkEnemyAroundDPS = function() {
        this.listEnemeyDps = [];
        if (this.gameController.enemys.length <= 0) return;
        for (var _i = 0, _a = this.gameController.enemys; _i < _a.length; _i++) {
          var enemy = _a[_i];
          var newDis = cc.pDistance(enemy.getPosition(), this.node.getPosition());
          var range = this.rangeDPS();
          newDis <= range && !enemy.getComponent(Enemy_1.default).isDie && this.listEnemeyDps.push(enemy);
        }
      };
      GemBloodStone.prototype.onCollisionEnter = function(other, self) {
        if ("1" != other.tag) return;
        other.node.getComponent(Enemy_1.default) && (other.node.getComponent(Enemy_1.default).isDie || other.node.getComponent(Enemy_1.default).takeDame(this.damageDps(), this.index));
      };
      __decorate([ property(cc.Prefab) ], GemBloodStone.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemBloodStone.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemBloodStone.prototype, "img", void 0);
      GemBloodStone = __decorate([ ccclass ], GemBloodStone);
      return GemBloodStone;
    }(Gem_1.default);
    exports.default = GemBloodStone;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemDarkEmerald: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "409a1ns77RDJ68IiZg8y2ZN", "GemDarkEmerald");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemDarkEmerald = function(_super) {
      __extends(GemDarkEmerald, _super);
      function GemDarkEmerald() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      GemDarkEmerald.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
      };
      GemDarkEmerald.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemDarkEmerald.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).stun = this.stun();
        bullet.getComponent(Bullet_1.default).chanceStun = this.chanceStun();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        bullet.getComponent(Bullet_1.default).crit = this.critDamage();
        bullet.getComponent(Bullet_1.default).chanceCrit = this.chanceCrit();
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], GemDarkEmerald.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemDarkEmerald.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemDarkEmerald.prototype, "img", void 0);
      GemDarkEmerald = __decorate([ ccclass ], GemDarkEmerald);
      return GemDarkEmerald;
    }(Gem_1.default);
    exports.default = GemDarkEmerald;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemDiamon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e2d53Ki/zBPg4vRnAyRBvZX", "GemDiamon");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemDiamon = function(_super) {
      __extends(GemDiamon, _super);
      function GemDiamon() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        return _this;
      }
      GemDiamon.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        this.listLevelObj = this.gameController.dataGem.Diamon.level;
        this.listArmorObj = this.gameController.dataGem.Diamon.arrmor;
      };
      GemDiamon.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("DiamonShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemDiamon.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        bullet.getComponent(Bullet_1.default).crit = this.critDamage();
        bullet.getComponent(Bullet_1.default).chanceCrit = this.chanceCrit();
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], GemDiamon.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemDiamon.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemDiamon.prototype, "img", void 0);
      GemDiamon = __decorate([ ccclass ], GemDiamon);
      return GemDiamon;
    }(Gem_1.default);
    exports.default = GemDiamon;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemEmerald: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2461eiHglPKYPvWsDIwkpV", "GemEmerald");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Bullet_1 = require("./Bullet");
    var Gem_1 = require("./Gem");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemEmerald = function(_super) {
      __extends(GemEmerald, _super);
      function GemEmerald() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      GemEmerald.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        this.listLevelObj = this.gameController.dataGem.Emerald.level;
        this.listArmorObj = this.gameController.dataGem.Emerald.arrmor;
      };
      GemEmerald.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("EmeraldShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.isCdShoot = true;
              var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
              newDis > this.range() && (this.targetEnemy = null);
            }
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemEmerald.prototype.detectNearestEnemy = function() {
        if (this.listEnemey.length <= 0) return;
        this.nearestEnemy = this.listEnemey[0];
        var dis = cc.pDistance(this.nearestEnemy.getPosition(), this.node.getPosition());
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var enemy = _a[_i];
          var newDis = cc.pDistance(enemy.getPosition(), this.node.getPosition());
          if (newDis < dis) {
            dis = newDis;
            this.nearestEnemy = enemy;
          }
        }
        dis < this.range() ? this.targetEnemy = this.nearestEnemy : this.targetEnemy = null;
      };
      GemEmerald.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var posion = cc.instantiate(this.bulletPrefab);
        posion.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        posion.getComponent(Bullet_1.default).target = this.targetEnemy;
        posion.getComponent(Bullet_1.default).damagePosion = this.damagePosion();
        posion.getComponent(Bullet_1.default).damage = this.damage();
        posion.getComponent(Bullet_1.default).slow = this.slow();
        posion.getComponent(Bullet_1.default).timeActive = this.timeActive();
        posion.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(posion);
      };
      __decorate([ property(cc.Prefab) ], GemEmerald.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemEmerald.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemEmerald.prototype, "img", void 0);
      GemEmerald = __decorate([ ccclass ], GemEmerald);
      return GemEmerald;
    }(Gem_1.default);
    exports.default = GemEmerald;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemGold: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0eee9GOKWRCiawTJMkf51K9", "GemGold");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemGold = function(_super) {
      __extends(GemGold, _super);
      function GemGold() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        return _this;
      }
      GemGold.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
      };
      GemGold.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemGold.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        bullet.getComponent(Bullet_1.default).crit = this.critDamage();
        bullet.getComponent(Bullet_1.default).chanceCrit = this.chanceCrit();
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], GemGold.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemGold.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemGold.prototype, "img", void 0);
      GemGold = __decorate([ ccclass ], GemGold);
      return GemGold;
    }(Gem_1.default);
    exports.default = GemGold;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemJade: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "70a6cfjlQlGgYHidogzCsjZ", "GemJade");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Jade = function(_super) {
      __extends(Jade, _super);
      function Jade() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      Jade.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
      };
      Jade.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      Jade.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).slow = this.slow();
        bullet.getComponent(Bullet_1.default).damagePosion = this.damagePosion();
        bullet.getComponent(Bullet_1.default).timeActive = this.timeActive();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        bullet.getComponent(Bullet_1.default).crit = this.critDamage();
        bullet.getComponent(Bullet_1.default).chanceCrit = this.chanceCrit();
        if (3 == this.currentLevel) {
          bullet.getComponent(Bullet_1.default).chanceStun = 1;
          bullet.getComponent(Bullet_1.default).stun = 2;
        }
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], Jade.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], Jade.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], Jade.prototype, "img", void 0);
      Jade = __decorate([ ccclass ], Jade);
      return Jade;
    }(Gem_1.default);
    exports.default = Jade;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemMalachite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4ec0ahoViNBs7Pg0PIrjIoO", "GemMalachite");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Malachite = function(_super) {
      __extends(Malachite, _super);
      function Malachite() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      Malachite.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
      };
      Malachite.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.listEnemey.length > 0) {
              this.animState = this.ani.play("SilverShoot");
              this.animState.duration = this.timeCd - .01;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            this.listEnemey.length > 0 && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      Malachite.prototype.shoot = function() {
        if (!this.listEnemey) return;
        if (this.currentLevel != this.listLevelObj.length) {
          var numRemove = void 0;
          1 == this.currentLevel && this.listEnemey.length > 3 && (numRemove = this.listEnemey.length - 3);
          2 == this.currentLevel && this.listEnemey.length > 4 && (numRemove = this.listEnemey.length - 4);
          for (var i = 0; i < numRemove; i++) for (var j = 0; j < this.listEnemey.length; j++) if (this.listEnemey[j].getComponent(Enemy_1.default).index == this.listEnemey.length) {
            this.listEnemey.splice(j, 1);
            break;
          }
        }
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var e = _a[_i];
          var bullet = cc.instantiate(this.bulletPrefab);
          bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
          bullet.getComponent(Bullet_1.default).target = e;
          bullet.getComponent(Bullet_1.default).damage = this.damage();
          bullet.getComponent(Bullet_1.default).indexTarget = e.getComponent(Enemy_1.default).index;
          this.gameController.mapController.node.addChild(bullet);
        }
      };
      __decorate([ property(cc.Prefab) ], Malachite.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], Malachite.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], Malachite.prototype, "img", void 0);
      Malachite = __decorate([ ccclass ], Malachite);
      return Malachite;
    }(Gem_1.default);
    exports.default = Malachite;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemOpal: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6e97RQOKFG8oDC6xIMEZvL", "GemOpal");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemOpal = function(_super) {
      __extends(GemOpal, _super);
      function GemOpal() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.cdTime = 0;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      GemOpal.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        this.listLevelObj = this.gameController.dataGem.Opal.level;
        this.listArmorObj = this.gameController.dataGem.Opal.arrmor;
      };
      GemOpal.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        if (!this.isbuff && this.buffSDP() > 0) {
          this.isbuff = true;
          var act = cc.callFunc(function() {
            this.checkGemAround(this.rangeBuff());
            this.listGemAround.length > 0 && this.buffGemsAround();
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(.1), act));
        }
        if (!this.gameController.isActiveWay) return;
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("OpalShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.isCdShoot = true;
              var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
              newDis > this.range() && (this.targetEnemy = null);
            }
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemOpal.prototype.buffGemsAround = function() {
        for (var _i = 0, _a = this.listGemAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = this.buffSDP();
          a.getComponent(Gem_1.default).BuffByOpal = this.buffSDP();
          a.getComponent(Gem_1.default).incrSDP < c && (a.getComponent(Gem_1.default).incrSDP = c);
        }
      };
      GemOpal.prototype.removedBuffGemsAround = function() {
        for (var _i = 0, _a = this.listGemAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = this.buffSDP();
          (a.getComponent(Gem_1.default).incrSDP = c) && (a.getComponent(Gem_1.default).incrSDP = 0);
        }
      };
      GemOpal.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], GemOpal.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemOpal.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemOpal.prototype, "img", void 0);
      GemOpal = __decorate([ ccclass ], GemOpal);
      return GemOpal;
    }(Gem_1.default);
    exports.default = GemOpal;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemParaibaTourmaline: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d82b3GbGUFFmrlmRHF9ZSQ2", "GemParaibaTourmaline");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemParaibaTourmaline = function(_super) {
      __extends(GemParaibaTourmaline, _super);
      function GemParaibaTourmaline() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.isCdToDeal = true;
        _this.targettedToDeal = null;
        return _this;
      }
      GemParaibaTourmaline.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
      };
      GemParaibaTourmaline.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        if (!this.isbuff && this.buffDMG() > 0) {
          this.checkGemAround(this.rangeBuff());
          this.listGemAround.length > 0 && this.buffGemsAround();
          this.isbuff = true;
        }
        this.checkEnemyAround();
        if ((!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0) {
          this.detectNearestEnemy();
          this.targettedToDeal = this.targetEnemy;
        }
        this.listEnemey.length > 0 && this.targettedToDeal && "" != this.targettedToDeal && this.isCdToDeal && this.dealDmgTargetted();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
              this.targettedToDeal = this.targetEnemy;
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemParaibaTourmaline.prototype.buffGemsAround = function() {
        for (var _i = 0, _a = this.listGemAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = this.buffDMG();
          a.getComponent(Gem_1.default).incrDMG < c && (a.getComponent(Gem_1.default).incrDMG = c);
        }
      };
      GemParaibaTourmaline.prototype.removedBuffGemsAround = function() {
        for (var _i = 0, _a = this.listGemAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = this.buffSDP();
          (a.getComponent(Gem_1.default).incrDMG = c) && (a.getComponent(Gem_1.default).incrDMG = 0);
        }
      };
      GemParaibaTourmaline.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      GemParaibaTourmaline.prototype.dealDmgTargetted = function() {
        this.isCdToDeal = false;
        if (this.chance(20)) {
          if (1 == this.currentLevel) {
            var dmg = Math.round(250 * this.armorDmg + 250);
            var incr = Math.round(dmg * this.incrDMG / 100);
            var totalDMG = Math.round(dmg + incr);
            this.targetEnemy.getComponent(Enemy_1.default).takeDame(totalDMG, this.index);
          }
          if (2 == this.currentLevel) {
            var dmg = Math.round(350 * this.armorDmg + 350);
            this.targetEnemy.getComponent(Enemy_1.default).takeDame(dmg, this.index);
          }
        }
        var act1 = cc.callFunc(function() {
          this.isCdToDeal = true;
        }, this);
        this.node.runAction(cc.sequence(cc.delayTime(1), act1));
      };
      GemParaibaTourmaline.prototype.chance = function(per) {
        var max = 1 / (per / 100);
        var min = 1;
        var ran = Math.floor(Math.random() * (max - min + 1)) + min;
        return 1 == ran;
      };
      __decorate([ property(cc.Prefab) ], GemParaibaTourmaline.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemParaibaTourmaline.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemParaibaTourmaline.prototype, "img", void 0);
      GemParaibaTourmaline = __decorate([ ccclass ], GemParaibaTourmaline);
      return GemParaibaTourmaline;
    }(Gem_1.default);
    exports.default = GemParaibaTourmaline;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemPinkDiamond: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bc4c2vRp8VMm55+mZxDOHDj", "GemPinkDiamond");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemPinkDiamond = function(_super) {
      __extends(GemPinkDiamond, _super);
      function GemPinkDiamond() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        return _this;
      }
      GemPinkDiamond.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
      };
      GemPinkDiamond.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemPinkDiamond.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        bullet.getComponent(Bullet_1.default).crit = this.critDamage();
        bullet.getComponent(Bullet_1.default).chanceCrit = this.chanceCrit();
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], GemPinkDiamond.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemPinkDiamond.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemPinkDiamond.prototype, "img", void 0);
      GemPinkDiamond = __decorate([ ccclass ], GemPinkDiamond);
      return GemPinkDiamond;
    }(Gem_1.default);
    exports.default = GemPinkDiamond;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemRedCrysta: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "800fbgcSqVOGrO99GHzwZkT", "GemRedCrysta");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Enemy_1 = require("./Enemy");
    var Bullet_1 = require("./Bullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemRedCrysta = function(_super) {
      __extends(GemRedCrysta, _super);
      function GemRedCrysta() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.listEnemeyDps = [];
        _this.collider = null;
        return _this;
      }
      GemRedCrysta.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
        this.collider = this.node.getComponent(cc.CircleCollider);
        this.collider.enabled = false;
      };
      GemRedCrysta.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAroundDPS();
        this.dpsSkill();
        if (this.minDamage() <= 0) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.playAdditive("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemRedCrysta.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      GemRedCrysta.prototype.dpsSkill = function() {
        if (this.listEnemeyDps.length > 0 && this.isCdDps) {
          var dps = this.node.getChildByName("dps");
          this.isCdDps = false;
          var rangeDPS = this.rangeDPS();
          dps.setContentSize(2 * rangeDPS, 2 * rangeDPS);
          this.collider.radius = rangeDPS;
          var act1 = cc.callFunc(function() {
            this.animState = this.ani.playAdditive("dpsStarRuby");
          }, this);
          var act2 = cc.callFunc(function() {
            this.collider.enabled = true;
          }, this);
          var act3 = cc.callFunc(function() {
            this.collider.enabled = false;
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdDps = true;
          }, this);
          this.node.runAction(cc.sequence(act1, cc.delayTime(1), act2, cc.delayTime(.05), act3, cdskill));
        }
      };
      GemRedCrysta.prototype.checkEnemyAroundDPS = function() {
        this.listEnemeyDps = [];
        if (this.gameController.enemys.length <= 0) return;
        for (var _i = 0, _a = this.gameController.enemys; _i < _a.length; _i++) {
          var enemy = _a[_i];
          var newDis = cc.pDistance(enemy.getPosition(), this.node.getPosition());
          var range = this.rangeDPS();
          newDis <= range && !enemy.getComponent(Enemy_1.default).isDie && this.listEnemeyDps.push(enemy);
        }
      };
      GemRedCrysta.prototype.onCollisionEnter = function(other, self) {
        if ("1" != other.tag) return;
        other.node.getComponent(Enemy_1.default) && (other.node.getComponent(Enemy_1.default).isDie || other.node.getComponent(Enemy_1.default).takeDame(this.damageDps(), this.index));
      };
      __decorate([ property(cc.Prefab) ], GemRedCrysta.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemRedCrysta.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemRedCrysta.prototype, "img", void 0);
      GemRedCrysta = __decorate([ ccclass ], GemRedCrysta);
      return GemRedCrysta;
    }(Gem_1.default);
    exports.default = GemRedCrysta;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemRuby: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "709a05Q6WFISK40efjNkrTv", "GemRuby");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Enemy_1 = require("./Enemy");
    var SplashBullet_1 = require("./SplashBullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemRuby = function(_super) {
      __extends(GemRuby, _super);
      function GemRuby() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.SplashBullet = null;
        _this.img = null;
        _this.turret = null;
        _this.cdTime = 0;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      GemRuby.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        this.listLevelObj = this.gameController.dataGem.Ruby.level;
        this.listArmorObj = this.gameController.dataGem.Ruby.arrmor;
        this.updateParameter();
      };
      GemRuby.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        if (!this.gameController.isActiveWay) return;
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("RubyShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemRuby.prototype.detectNearestEnemy = function() {
        if (this.listEnemey.length <= 0) return;
        this.nearestEnemy = this.listEnemey[0];
        var dis = cc.pDistance(this.nearestEnemy.getPosition(), this.node.getPosition());
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var enemy = _a[_i];
          var newDis = cc.pDistance(enemy.getPosition(), this.node.getPosition());
          if (newDis < dis) {
            dis = newDis;
            this.nearestEnemy = enemy;
          }
        }
        dis < this.range() ? this.targetEnemy = this.nearestEnemy : this.targetEnemy = null;
      };
      GemRuby.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.SplashBullet);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(SplashBullet_1.default).target = this.targetEnemy;
        bullet.getComponent(SplashBullet_1.default).damage = this.damage();
        bullet.getComponent(SplashBullet_1.default).nameExplosion = "RubyExplosion";
        bullet.getComponent(SplashBullet_1.default).gameController = this.gameController;
        bullet.getComponent(SplashBullet_1.default).splashTile = this.splashRange();
        bullet.getComponent(SplashBullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], GemRuby.prototype, "SplashBullet", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemRuby.prototype, "img", void 0);
      __decorate([ property(cc.Node) ], GemRuby.prototype, "turret", void 0);
      GemRuby = __decorate([ ccclass ], GemRuby);
      return GemRuby;
    }(Gem_1.default);
    exports.default = GemRuby;
    cc._RF.pop();
  }, {
    "./Enemy": "Enemy",
    "./Gem": "Gem",
    "./SplashBullet": "SplashBullet"
  } ],
  GemSapphire: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fdcceOg1NxOooZfU35YKlDS", "GemSapphire");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemSapphire = function(_super) {
      __extends(GemSapphire, _super);
      function GemSapphire() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      GemSapphire.prototype.slow = function() {
        return this.listLevelObj[this.currentLevel - 1].slow;
      };
      GemSapphire.prototype.timeActive = function() {
        return this.listLevelObj[this.currentLevel - 1].timeActive;
      };
      GemSapphire.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        this.listLevelObj = this.gameController.dataGem.Sapphire.level;
        this.listArmorObj = this.gameController.dataGem.Sapphire.arrmor;
      };
      GemSapphire.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("SapphireShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemSapphire.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        bullet.getComponent(Bullet_1.default).slow = this.slow();
        bullet.getComponent(Bullet_1.default).timeActive = this.timeActive();
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], GemSapphire.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemSapphire.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemSapphire.prototype, "img", void 0);
      GemSapphire = __decorate([ ccclass ], GemSapphire);
      return GemSapphire;
    }(Gem_1.default);
    exports.default = GemSapphire;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemSilver: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "72b2cLyTURBRLpwb7oXM2IK", "GemSilver");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Enemy_1 = require("./Enemy");
    var SplashBullet_1 = require("./SplashBullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemSilver = function(_super) {
      __extends(GemSilver, _super);
      function GemSilver() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      GemSilver.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
      };
      GemSilver.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemSilver.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(SplashBullet_1.default).target = this.targetEnemy;
        bullet.getComponent(SplashBullet_1.default).damage = this.damage();
        bullet.getComponent(SplashBullet_1.default).gameController = this.gameController;
        bullet.getComponent(SplashBullet_1.default).nameExplosion = "SilverExplosion";
        bullet.getComponent(SplashBullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        bullet.getComponent(SplashBullet_1.default).slow = this.slow();
        bullet.getComponent(SplashBullet_1.default).splashTile = this.splashRange();
        bullet.getComponent(SplashBullet_1.default).timeActive = this.timeActive();
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], GemSilver.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemSilver.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemSilver.prototype, "img", void 0);
      GemSilver = __decorate([ ccclass ], GemSilver);
      return GemSilver;
    }(Gem_1.default);
    exports.default = GemSilver;
    cc._RF.pop();
  }, {
    "./Enemy": "Enemy",
    "./Gem": "Gem",
    "./SplashBullet": "SplashBullet"
  } ],
  GemStarRuby: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "04815/o/dJMqo7qn6MdIc7j", "GemStarRuby");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Enemy_1 = require("./Enemy");
    var Bullet_1 = require("./Bullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemStarRuby = function(_super) {
      __extends(GemStarRuby, _super);
      function GemStarRuby() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.listEnemeyDps = [];
        _this.collider = null;
        return _this;
      }
      GemStarRuby.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
        this.collider = this.node.getComponent(cc.CircleCollider);
        this.collider.enabled = false;
      };
      GemStarRuby.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAroundDPS();
        this.dpsSkill();
        if (this.minDamage() <= 0) return;
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.playAdditive("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemStarRuby.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        bullet.getComponent(Bullet_1.default).crit = this.critDamage();
        bullet.getComponent(Bullet_1.default).chanceCrit = this.chanceCrit();
        this.gameController.mapController.node.addChild(bullet);
      };
      GemStarRuby.prototype.dpsSkill = function() {
        if (this.listEnemeyDps.length > 0 && this.isCdDps) {
          var dps = this.node.getChildByName("dps");
          this.isCdDps = false;
          var rangeDPS = this.rangeDPS();
          dps.setContentSize(2 * rangeDPS, 2 * rangeDPS);
          this.collider.radius = rangeDPS;
          var act1 = cc.callFunc(function() {
            this.animState = this.ani.playAdditive("dpsStarRuby");
          }, this);
          var act2 = cc.callFunc(function() {
            this.collider.enabled = true;
          }, this);
          var act3 = cc.callFunc(function() {
            this.collider.enabled = false;
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdDps = true;
          }, this);
          this.node.runAction(cc.sequence(act1, cc.delayTime(1), act2, cc.delayTime(.05), act3, cdskill));
        }
      };
      GemStarRuby.prototype.checkEnemyAroundDPS = function() {
        this.listEnemeyDps = [];
        if (this.gameController.enemys.length <= 0) return;
        for (var _i = 0, _a = this.gameController.enemys; _i < _a.length; _i++) {
          var enemy = _a[_i];
          var newDis = cc.pDistance(enemy.getPosition(), this.node.getPosition());
          var range = this.rangeDPS();
          newDis <= range && !enemy.getComponent(Enemy_1.default).isDie && this.listEnemeyDps.push(enemy);
        }
      };
      GemStarRuby.prototype.onCollisionEnter = function(other, self) {
        if ("1" != other.tag) return;
        other.node.getComponent(Enemy_1.default) && (other.node.getComponent(Enemy_1.default).isDie || other.node.getComponent(Enemy_1.default).takeDame(this.damageDps(), this.index));
      };
      __decorate([ property(cc.Prefab) ], GemStarRuby.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemStarRuby.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemStarRuby.prototype, "img", void 0);
      GemStarRuby = __decorate([ ccclass ], GemStarRuby);
      return GemStarRuby;
    }(Gem_1.default);
    exports.default = GemStarRuby;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemTopaz: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c3f5pZz3pMY7URvY8IGE24", "GemTopaz");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemTopaz = function(_super) {
      __extends(GemTopaz, _super);
      function GemTopaz() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.cdTime = 0;
        _this.nearestEnemy = null;
        return _this;
      }
      GemTopaz.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        this.listLevelObj = this.gameController.dataGem.Topaz.level;
        this.listArmorObj = this.gameController.dataGem.Topaz.arrmor;
      };
      GemTopaz.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.listEnemey.length > 0) {
              this.ani.setCurrentTime(1.8, "TopazShoot");
              this.animState = this.ani.play("TopazShoot");
              this.animState.duration = this.timeCd - .01;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            this.listEnemey.length > 0 && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemTopaz.prototype.shoot = function() {
        if (!this.listEnemey) return;
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var e = _a[_i];
          var bullet = cc.instantiate(this.bulletPrefab);
          bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
          bullet.getComponent(Bullet_1.default).target = e;
          bullet.getComponent(Bullet_1.default).damage = this.damage();
          bullet.getComponent(Bullet_1.default).indexTarget = e.getComponent(Enemy_1.default).index;
          this.gameController.mapController.node.addChild(bullet);
        }
      };
      __decorate([ property(cc.Prefab) ], GemTopaz.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemTopaz.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemTopaz.prototype, "img", void 0);
      GemTopaz = __decorate([ ccclass ], GemTopaz);
      return GemTopaz;
    }(Gem_1.default);
    exports.default = GemTopaz;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemUranium238: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1bdf5Rs2ohMY5SbN/SahPiM", "GemUranium238");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Enemy_1 = require("./Enemy");
    var Bullet_1 = require("./Bullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemUranium238 = function(_super) {
      __extends(GemUranium238, _super);
      function GemUranium238() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.isCdToDeal = true;
        _this.targettedToDeal = null;
        _this.listEnemeyDps = [];
        _this.listEnemeyBurn = [];
        _this.collider = null;
        return _this;
      }
      GemUranium238.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
        this.collider = this.node.getComponent(cc.CircleCollider);
        this.collider.enabled = false;
      };
      GemUranium238.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        if (2 == this.currentLevel) {
          this.checkEnemyAroundDPS();
          this.dpsSkill();
        }
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        this.checkEnemyAroundBurn();
        this.burnTargetted();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.playAdditive("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
              this.targettedToDeal = this.targetEnemy;
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemUranium238.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).chanceCrit = this.chanceCrit();
        bullet.getComponent(Bullet_1.default).crit = this.critDamage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      GemUranium238.prototype.burnTargetted = function() {
        if (this.listEnemeyBurn.length > 0 && this.isCdToDeal) {
          this.isCdToDeal = false;
          for (var _i = 0, _a = this.listEnemeyBurn; _i < _a.length; _i++) {
            var a = _a[_i];
            var dmg = Math.round(200 * this.armorDmg + 200);
            var incr = Math.round(dmg * this.incrDMG / 100);
            var totalDMG = Math.round(dmg + incr);
            a.getComponent(Enemy_1.default).takeDame(totalDMG, this.index);
            a.getComponent(Enemy_1.default).slow(50, 1);
          }
          var act1 = cc.callFunc(function() {
            this.isCdToDeal = true;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(1), act1));
        }
      };
      GemUranium238.prototype.chance = function(per) {
        var max = 1 / (per / 100);
        var min = 1;
        var ran = Math.floor(Math.random() * (max - min + 1)) + min;
        return 1 == ran;
      };
      GemUranium238.prototype.dpsSkill = function() {
        if (this.listEnemeyDps.length > 0 && this.isCdDps) {
          var dps = this.node.getChildByName("dps");
          this.isCdDps = false;
          var rangeDPS = this.rangeDPS();
          dps.setContentSize(2 * rangeDPS, 2 * rangeDPS);
          this.collider.radius = rangeDPS;
          var act1 = cc.callFunc(function() {
            this.animState = this.ani.playAdditive("dpsStarRuby");
          }, this);
          var act2 = cc.callFunc(function() {
            this.collider.enabled = true;
          }, this);
          var act3 = cc.callFunc(function() {
            this.collider.enabled = false;
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdDps = true;
          }, this);
          this.node.runAction(cc.sequence(act1, cc.delayTime(1), act2, cc.delayTime(.05), act3, cdskill));
        }
      };
      GemUranium238.prototype.checkEnemyAroundDPS = function() {
        this.listEnemeyDps = [];
        if (this.gameController.enemys.length <= 0) return;
        for (var _i = 0, _a = this.gameController.enemys; _i < _a.length; _i++) {
          var enemy = _a[_i];
          var newDis = cc.pDistance(enemy.getPosition(), this.node.getPosition());
          var range = this.rangeDPS();
          newDis <= range && !enemy.getComponent(Enemy_1.default).isDie && this.listEnemeyDps.push(enemy);
        }
      };
      GemUranium238.prototype.checkEnemyAroundBurn = function() {
        this.listEnemeyBurn = [];
        if (this.gameController.enemys.length <= 0) return;
        for (var _i = 0, _a = this.gameController.enemys; _i < _a.length; _i++) {
          var enemy = _a[_i];
          var newDis = cc.pDistance(enemy.getPosition(), this.node.getPosition());
          newDis <= this.rangeBurn() && !enemy.getComponent(Enemy_1.default).isDie && this.listEnemeyBurn.push(enemy);
        }
      };
      GemUranium238.prototype.onCollisionEnter = function(other, self) {
        if ("1" != other.tag) return;
        other.node.getComponent(Enemy_1.default) && (other.node.getComponent(Enemy_1.default).isDie || other.node.getComponent(Enemy_1.default).takeDame(this.damageDps()));
      };
      __decorate([ property(cc.Prefab) ], GemUranium238.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemUranium238.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemUranium238.prototype, "img", void 0);
      GemUranium238 = __decorate([ ccclass ], GemUranium238);
      return GemUranium238;
    }(Gem_1.default);
    exports.default = GemUranium238;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  GemYellowSapphire: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4710fb0/VtNE6yFpE2XiChG", "GemYellowSapphire");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var SplashBullet_1 = require("./SplashBullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemYellowSapphire = function(_super) {
      __extends(GemYellowSapphire, _super);
      function GemYellowSapphire() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      GemYellowSapphire.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataGemCombine.length; i++) if (this.gameController.dataGemCombine[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataGemCombine[indexx].Level;
        this.listArmorObj = this.gameController.dataGemCombine[indexx].arrmor;
      };
      GemYellowSapphire.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        if (!this.isbuff && this.buffDMG() > 0) {
          this.checkGemAround(this.rangeBuff());
          this.listGemAround.length > 0 && this.buffGemsAround();
          this.isbuff = true;
        }
        this.checkEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act1 = cc.callFunc(function() {
            if (this.targetEnemy && "" != this.targetEnemy.name) {
              this.animState = this.ani.play("SilverShoot");
              this.animState.duration = this.timeCd - .1;
            }
          }, this);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act1, act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      GemYellowSapphire.prototype.buffGemsAround = function() {
        for (var _i = 0, _a = this.listGemAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = this.buffDMG();
          a.getComponent(Gem_1.default).incrDMG < c && (a.getComponent(Gem_1.default).incrDMG = c);
        }
      };
      GemYellowSapphire.prototype.removedBuffGemsAround = function() {
        for (var _i = 0, _a = this.listGemAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = this.buffSDP();
          (a.getComponent(Gem_1.default).incrDMG = c) && (a.getComponent(Gem_1.default).incrDMG = 0);
        }
      };
      GemYellowSapphire.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(SplashBullet_1.default).target = this.targetEnemy;
        bullet.getComponent(SplashBullet_1.default).damage = this.damage();
        bullet.getComponent(SplashBullet_1.default).gameController = this.gameController;
        bullet.getComponent(SplashBullet_1.default).nameExplosion = "SilverExplosion";
        bullet.getComponent(SplashBullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        bullet.getComponent(SplashBullet_1.default).slow = this.slow();
        bullet.getComponent(SplashBullet_1.default).splashTile = this.splashRange();
        bullet.getComponent(SplashBullet_1.default).timeActive = this.timeActive();
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], GemYellowSapphire.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], GemYellowSapphire.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], GemYellowSapphire.prototype, "img", void 0);
      GemYellowSapphire = __decorate([ ccclass ], GemYellowSapphire);
      return GemYellowSapphire;
    }(Gem_1.default);
    exports.default = GemYellowSapphire;
    cc._RF.pop();
  }, {
    "./Enemy": "Enemy",
    "./Gem": "Gem",
    "./SplashBullet": "SplashBullet"
  } ],
  Gem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1cadbeAfW1Em5wFkKlZxSkT", "Gem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Gem = function(_super) {
      __extends(Gem, _super);
      function Gem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pos = null;
        _this.posSquare = [];
        _this.gameController = null;
        _this.isCdShoot = true;
        _this.isCdDps = true;
        _this.ani = null;
        _this.animState = null;
        _this.icon = null;
        _this.index = 0;
        _this.targetEnemy = null;
        _this.nearestEnemy = null;
        _this.BuffByOpal = 0;
        _this.listEnemey = [];
        _this.listLevelObj = [];
        _this.listArmorObj = [];
        _this.listGemAround = [];
        _this.currentLevel = 0;
        _this.incrSDP = 0;
        _this.incrDMG = 0;
        _this.numSelfKill = 0;
        _this.isCombined = false;
        _this.timeCd = 1;
        _this.armorDmg = 0;
        _this.maxCd = .05;
        _this.isbuff = false;
        return _this;
      }
      Gem_1 = Gem;
      Gem.prototype.chanceCrit = function() {
        return this.listLevelObj[this.currentLevel - 1].chanceCrit;
      };
      Gem.prototype.chanceStun = function() {
        return this.listLevelObj[this.currentLevel - 1].chanceStun;
      };
      Gem.prototype.stun = function() {
        return this.listLevelObj[this.currentLevel - 1].stun;
      };
      Gem.prototype.cost = function() {
        return this.listLevelObj[this.currentLevel - 1].costUpgrade;
      };
      Gem.prototype.range = function() {
        var range = this.listLevelObj[this.currentLevel - 1].range * this.gameController.tileSize * 2;
        return range + this.node.height / 2;
      };
      Gem.prototype.rangeDPS = function() {
        var rangeDps = this.listLevelObj[this.currentLevel - 1].dpsTile * this.gameController.tileSize * 2;
        return rangeDps + this.node.height / 2;
      };
      Gem.prototype.rangeBurn = function() {
        var rangeBurn = this.listLevelObj[this.currentLevel - 1].burnTile * this.gameController.tileSize * 2;
        return rangeBurn + this.node.height / 2;
      };
      Gem.prototype.cdActiveSkill = function() {
        return this.listLevelObj[this.currentLevel - 1].speed / 30;
      };
      Gem.prototype.damage = function() {
        var min = this.minDamage();
        var max = this.maxDamage();
        var dmg = Math.floor(Math.random() * (max - min + 1)) + min;
        var incr = Math.round(dmg * this.incrDMG / 100);
        var dmgArmor = dmg * this.armorDmg;
        var totalDMG = Math.round(dmg + incr + dmgArmor);
        return totalDMG;
      };
      Gem.prototype.minDamage = function() {
        return this.listLevelObj[this.currentLevel - 1].damageMin;
      };
      Gem.prototype.maxDamage = function() {
        return this.listLevelObj[this.currentLevel - 1].damageMax;
      };
      Gem.prototype.Type = function() {
        return this.listLevelObj[this.currentLevel - 1].name;
      };
      Gem.prototype.slow = function() {
        return this.listLevelObj[this.currentLevel - 1].slow;
      };
      Gem.prototype.timeActive = function() {
        return this.listLevelObj[this.currentLevel - 1].timeActive;
      };
      Gem.prototype.splashRange = function() {
        return this.listLevelObj[this.currentLevel - 1].splashTile;
      };
      Gem.prototype.critDamage = function() {
        return this.listLevelObj[this.currentLevel - 1].critDamage;
      };
      Gem.prototype.damageDps = function() {
        var dmgDPS = this.listLevelObj[this.currentLevel - 1].damageDps;
        var dmgArmor = dmgDPS * this.armorDmg;
        var incr = Math.round(dmgDPS * this.incrDMG / 100);
        var totalDMG = Math.round(dmgDPS + incr + dmgArmor);
        return totalDMG;
      };
      Gem.prototype.damagePosion = function() {
        var dmgPosion = this.listLevelObj[this.currentLevel - 1].damagePosion;
        var dmgArmor = dmgPosion * this.armorDmg;
        var totalDMG = Math.round(dmgPosion + dmgArmor);
        return totalDMG;
      };
      Gem.prototype.buffSDP = function() {
        return this.listLevelObj[this.currentLevel - 1].increaseSDP;
      };
      Gem.prototype.buffDMG = function() {
        return this.listLevelObj[this.currentLevel - 1].increaseDMG;
      };
      Gem.prototype.rangeBuff = function() {
        return this.listLevelObj[this.currentLevel - 1].rangeIncre * (2 * this.gameController.tileSize);
      };
      Gem.prototype.isCanAttack = function() {
        var check = this.listLevelObj[this.currentLevel - 1].typeAttack;
        return "both" === check || (!("air" != check || !this.gameController.isFlyEnemyNextWay) || "ground" == check && !this.gameController.isFlyEnemyNextWay);
      };
      Gem.prototype.checkEnemyAround = function() {
        this.listEnemey = [];
        if (this.gameController.enemys.length <= 0) return;
        for (var _i = 0, _a = this.gameController.enemys; _i < _a.length; _i++) {
          var enemy = _a[_i];
          var newDis = cc.pDistance(enemy.getPosition(), this.node.getPosition());
          newDis <= this.range() && !enemy.getComponent(Enemy_1.default).isDie && this.listEnemey.push(enemy);
        }
      };
      Gem.prototype.checkGemAround = function(range) {
        if (this.gameController.gems.length <= 0) return;
        this.listGemAround = [];
        for (var _i = 0, _a = this.gameController.gems; _i < _a.length; _i++) {
          var a = _a[_i];
          var newDis = cc.pDistance(a.getPosition(), this.node.getPosition());
          var b = range;
          if (newDis <= b) {
            if (a.getComponent(Gem_1).pos.x == this.pos.x && a.getComponent(Gem_1).pos.y == this.pos.y) continue;
            this.listGemAround.push(a);
          }
        }
      };
      Gem.prototype.updateParameter = function() {
        this.cost();
        this.range();
        this.cdActiveSkill();
        this.damage();
        this.Type();
      };
      Gem.prototype.detectNearestEnemy = function() {
        if (this.listEnemey.length <= 0) return;
        this.nearestEnemy = this.listEnemey[0];
        var dis = cc.pDistance(this.nearestEnemy.getPosition(), this.gameController.endMile);
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var enemy = _a[_i];
          var newDis = cc.pDistance(enemy.getPosition(), this.gameController.endMile);
          if (newDis < dis) {
            dis = newDis;
            this.nearestEnemy = enemy;
          }
        }
        this.targetEnemy = this.nearestEnemy;
      };
      Gem = Gem_1 = __decorate([ ccclass ], Gem);
      return Gem;
      var Gem_1;
    }(cc.Component);
    exports.default = Gem;
    cc._RF.pop();
  }, {
    "./Enemy": "Enemy"
  } ],
  HitDamage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2b8a42Ga9O35cdiQia3/4C", "HitDamage");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HitDamage = function(_super) {
      __extends(HitDamage, _super);
      function HitDamage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.damageDisplay = 0;
        return _this;
      }
      HitDamage.prototype.onLoad = function() {
        this.label = this.node.getComponent(cc.Label);
        this.label.string = this.damageDisplay.toString();
        this.node.runAction(cc.spawn(cc.moveBy(1, cc.v2(0, 20)), cc.fadeOut(1)));
        this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
          this.node.destroy();
        }, this)));
      };
      HitDamage.prototype.start = function() {};
      HitDamage = __decorate([ ccclass ], HitDamage);
      return HitDamage;
    }(cc.Component);
    exports.default = HitDamage;
    cc._RF.pop();
  }, {} ],
  InitData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6e9f5QuFj9HnbLqV70Cea5t", "InitData");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var InitData = function() {
      function InitData() {}
      InitData.ranLevelGem = function(currentLvPlayer) {
        var ran = Math.random();
        switch (currentLvPlayer) {
         case 0:
         case 1:
          return 1;

         case 2:
          return 2;

         case 3:
          return 3;

         case 4:
          return 4;

         case 5:
          return ran <= .3 ? 1 : ran <= .6 ? 2 : ran <= .9 ? 3 : 4;

         case 6:
          return ran <= .2 ? 1 : ran <= .5 ? 2 : ran <= .8 ? 3 : 4;

         case 7:
          return ran <= .1 ? 1 : ran <= .4 ? 2 : ran <= .7 ? 3 : 4;

         case 8:
          return 5;
        }
      };
      InitData.maxLevelGem = 6;
      InitData.mileWays = [ cc.v2(3, 3), cc.v2(3, 11), cc.v2(3, 20), cc.v2(22, 20), cc.v2(41, 20), cc.v2(41, 10), cc.v2(22, 10), cc.v2(22, 20), cc.v2(22, 40), cc.v2(41, 40), cc.v2(41, 50) ];
      InitData.listIsFly = [ false, true, false, true ];
      return InitData;
    }();
    exports.default = InitData;
    cc._RF.pop();
  }, {} ],
  ManagerUi: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "187d1a//TlDHY9MzIhmw1Fi", "ManagerUi");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameController_1 = require("./GameController");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ManagerUi = function(_super) {
      __extends(ManagerUi, _super);
      function ManagerUi() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.gemcontroller = null;
        _this.nodeFormulaCombine = null;
        _this.isLoadFormulaCombine = false;
        return _this;
      }
      ManagerUi.prototype.loadFormulaCombine = function() {
        var data = this.gemcontroller.formulaCombineGem;
        var content = this.nodeFormulaCombine.getComponent(cc.ScrollView).content;
        var item = content.getChildByName("item");
        var string = data[0].Name + " = ";
        for (var a = 0; a < data[0].List.length; a++) {
          string += data[0].List[a][0] + " " + data[0].List[a][1];
          a + 1 != data[0].List.length && (string += " + ");
        }
        item.getChildByName("label").getComponent(cc.Label).string = string;
        for (var i = 1; i < data.length; i++) {
          var instan = cc.instantiate(item);
          instan.setPosition(cc.v2(0, 0));
          content.addChild(instan);
          var stringInstan = data[i].Name + " = ";
          stringInstan = data[i].Name + " = ";
          for (var a = 0; a < data[i].List.length; a++) {
            stringInstan += data[i].List[a][0] + " " + data[i].List[a][1];
            a + 1 != data[i].List.length && (stringInstan += " + ");
          }
          instan.getChildByName("label").getComponent(cc.Label).string = stringInstan;
        }
        this.isLoadFormulaCombine = true;
      };
      __decorate([ property(GameController_1.default) ], ManagerUi.prototype, "gemcontroller", void 0);
      __decorate([ property(cc.Node) ], ManagerUi.prototype, "nodeFormulaCombine", void 0);
      ManagerUi = __decorate([ ccclass ], ManagerUi);
      return ManagerUi;
    }(cc.Component);
    exports.default = ManagerUi;
    cc._RF.pop();
  }, {
    "./GameController": "GameController"
  } ],
  MapController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68f467dcuxJXrR7kw1EJ5XF", "MapController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ATile_1 = require("./ATile");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MapController = function(_super) {
      __extends(MapController, _super);
      function MapController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.posTouchEnd = null;
        _this.paths = [];
        _this.open = [];
        _this.closed = [];
        _this.newATile = null;
        _this.gameController = null;
        return _this;
      }
      MapController.prototype.onLoad = function() {};
      MapController.prototype.tilePosistion = function(pixelPosition) {
        var mapSize = this.node.getContentSize();
        var tileSizeWidth = this.gameController.tileSize;
        var tileSizeHeight = this.gameController.tileSize;
        var x = Math.floor(pixelPosition.x / tileSizeWidth);
        var y = Math.floor((mapSize.height - pixelPosition.y) / tileSizeHeight);
        return cc.p(x, y);
      };
      MapController.prototype.pixelPosition = function(tilePosistion) {
        var mapSize = this.node.getContentSize();
        var tileSizeWidth = this.gameController.tileSize;
        var tileSizeHeight = this.gameController.tileSize;
        var x = tileSizeWidth * tilePosistion.x + tileSizeWidth / 2;
        var y = mapSize.height - tileSizeHeight * tilePosistion.y - tileSizeWidth / 2;
        return cc.p(x, y);
      };
      MapController.prototype.indexOfStepArray = function(value, stepArray) {
        for (var i = 0; i < stepArray.length; ++i) if (value.equals(stepArray[i].position)) return i;
        return -1;
      };
      MapController.prototype.insertToOpen = function(step) {
        step.getF();
        var stepF = step.f;
        var length = this.open.length;
        var i = 0;
        for (;i < length; ++i) if (stepF <= this.open[i].f) break;
        this.open.splice(i, 0, step);
      };
      MapController.prototype.moveToward = function(start, finish, isFly) {
        this.closed = [];
        this.open = [];
        var paths = [];
        var newATile = new ATile_1.default(start);
        this.open.push(newATile);
        var pathFound = false;
        do {
          var currentStep = this.open.shift();
          (currentStep.x < 0 || currentStep.y < 0) && cc.log("currentStep: " + currentStep);
          this.closed.push(currentStep);
          if (currentStep.position.equals(finish)) {
            pathFound = true;
            var tmpStep = currentStep;
            do {
              paths.unshift(tmpStep.position);
              tmpStep = tmpStep.last;
            } while (null !== tmpStep);
            this.open = [];
            this.closed = [];
            break;
          }
          var borderPositions = this.borderMovablePoints(currentStep.position, isFly);
          for (var i = 0; i < borderPositions.length; ++i) {
            var borderPosition = borderPositions[i];
            if (-1 != this.indexOfStepArray(borderPosition, this.closed)) {
              borderPositions.splice(i, 1);
              i--;
              continue;
            }
            var step = new ATile_1.default(borderPosition);
            var moveCost = 1;
            var index = this.indexOfStepArray(borderPosition, this.open);
            if (-1 == index) {
              step.last = currentStep;
              step.g = currentStep.g + moveCost;
              var distancePoint = borderPosition.sub(finish);
              step.h = Math.abs(distancePoint.x) + Math.abs(distancePoint.y);
              this.insertToOpen(step);
            } else {
              step = this.open[index];
              if (currentStep.g + moveCost < step.g) {
                step.g = currentStep.g + moveCost;
                this.open.splice(index, 1);
                this.insertToOpen(step);
              }
            }
          }
        } while (this.open.length > 0);
        return paths;
      };
      MapController.prototype.borderMovablePoints = function(position, isFly) {
        var results = [];
        var hasTop = false;
        var hasBottom = false;
        var hasLeft = false;
        var hasRight = false;
        var top = cc.p(position.x, position.y - 1);
        var tiles = this.gameController.tiles;
        var index;
        index = top.y * this.gameController.row + top.x;
        if (top.y >= 0 && tiles[index] && top.y <= this.gameController.col - 1) if (isFly) {
          results.push(top);
          hasTop = true;
        } else if (false == tiles[index].hasGem && false == tiles[index].hasStone) {
          results.push(top);
          hasTop = true;
        }
        var bottom = cc.p(position.x, position.y + 1);
        index = bottom.y * this.gameController.row + bottom.x;
        if (bottom.y >= 0 && tiles[index] && bottom.y <= this.gameController.col - 1) if (isFly) {
          results.push(bottom);
          hasBottom = true;
        } else if (tiles[index] && false == tiles[index].hasGem && false == tiles[index].hasStone) {
          results.push(bottom);
          hasBottom = true;
        }
        var left = cc.p(position.x - 1, position.y);
        index = left.y * this.gameController.row + left.x;
        if (left.x >= 0 && tiles[index] && left.x <= this.gameController.row - 1) if (isFly) {
          results.push(left);
          hasLeft = true;
        } else if (tiles[index] && false == tiles[index].hasGem && false == tiles[index].hasStone) {
          results.push(left);
          hasLeft = true;
        }
        var right = cc.p(position.x + 1, position.y);
        index = right.y * this.gameController.row + right.x;
        if (right.x >= 0 && tiles[index] && right.x <= this.gameController.row - 1) if (isFly) {
          results.push(right);
          hasRight = true;
        } else if (tiles[index] && false == tiles[index].hasGem && false == tiles[index].hasStone) {
          results.push(right);
          hasRight = true;
        }
        return results;
      };
      MapController = __decorate([ ccclass ], MapController);
      return MapController;
    }(cc.Component);
    exports.default = MapController;
    cc._RF.pop();
  }, {
    "./ATile": "ATile"
  } ],
  SlateAirSlate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "26512qrDrhOKa0qK+ZkY1oo", "SlateAirSlate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SlateAirSlate = function(_super) {
      __extends(SlateAirSlate, _super);
      function SlateAirSlate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.listEnemyGround = [];
        _this.listEnemyAir = [];
        return _this;
      }
      SlateAirSlate.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataSlate.length; i++) if (this.gameController.dataSlate[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataSlate[indexx].Level;
        this.listArmorObj = this.gameController.dataSlate[indexx].arrmor;
      };
      SlateAirSlate.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkBothEnemyAround();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.targetEnemy && "" != this.targetEnemy.name && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            var range;
            range = this.gameController.isFlyEnemyNextWay ? 4 * this.gameController.tileSize * 2 + this.node.height / 2 : 1 * this.gameController.tileSize * 2 + this.node.height / 2;
            if (newDis > range) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.targetEnemy && "" != this.targetEnemy.name && (this.isCdShoot = true);
          }, this);
          this.node.runAction(cc.sequence(act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      SlateAirSlate.prototype.checkBothEnemyAround = function() {
        this.listEnemey = [];
        if (this.gameController.enemys.length <= 0) return;
        var range;
        range = this.gameController.isFlyEnemyNextWay ? 4 * this.gameController.tileSize * 2 + this.node.height / 2 : 1 * this.gameController.tileSize * 2 + this.node.height / 2;
        for (var _i = 0, _a = this.gameController.enemys; _i < _a.length; _i++) {
          var enemy = _a[_i];
          var newDis = cc.pDistance(enemy.getPosition(), this.node.getPosition());
          newDis <= range && !enemy.getComponent(Enemy_1.default).isDie && this.listEnemey.push(enemy);
        }
      };
      SlateAirSlate.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], SlateAirSlate.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], SlateAirSlate.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], SlateAirSlate.prototype, "img", void 0);
      SlateAirSlate = __decorate([ ccclass ], SlateAirSlate);
      return SlateAirSlate;
    }(Gem_1.default);
    exports.default = SlateAirSlate;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  SlateAncientSlate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6dbbN6Ke1Nxb+FOAENoG37", "SlateAncientSlate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Enemy_1 = require("./Enemy");
    var Bullet_1 = require("./Bullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SlateAncientSlate = function(_super) {
      __extends(SlateAncientSlate, _super);
      function SlateAncientSlate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.isCdDmgSkill = true;
        _this.isCdHoldSkill = true;
        _this.listSlateAround = [];
        return _this;
      }
      SlateAncientSlate.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataSlate.length; i++) if (this.gameController.dataSlate[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataSlate[indexx].Level;
        this.listArmorObj = this.gameController.dataSlate[indexx].arrmor;
      };
      SlateAncientSlate.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        if (!this.isbuff) {
          var range = 3 * this.gameController.tileSize * 2 + this.node.height / 2;
          this.checkSlateAround(range);
          this.listSlateAround.length > 0 && this.buffSlateAround(10);
          this.isbuff = true;
        }
        this.checkEnemyAround();
        this.dmgSkill();
        if (this.targetEnemy) {
          var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
          if (newDis > this.range()) {
            this.targetEnemy = null;
            this.detectNearestEnemy();
          }
        }
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        this.holdEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      SlateAncientSlate.prototype.dmgSkill = function() {
        if (this.listEnemey.length > 0 && this.isCdDmgSkill) {
          this.isCdDmgSkill = false;
          for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
            var a = _a[_i];
            var rand = Math.floor(116 * Math.random()) + 5;
            var dmg = Math.round(this.numSelfKill * rand + 50 * this.gameController.levelPlayer);
            var dmgArmor = dmg * this.armorDmg;
            var incr = Math.round(dmg * this.incrDMG / 100);
            var totalDMG = Math.round(dmg + incr + dmgArmor);
            a.getComponent(Enemy_1.default).takeDame(totalDMG, this.index);
          }
          var act1 = cc.callFunc(function() {
            this.isCdDmgSkill = true;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(1), act1));
        }
      };
      SlateAncientSlate.prototype.buffSlateAround = function(Dmg) {
        for (var _i = 0, _a = this.listSlateAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = Dmg;
          a.getComponent(Gem_1.default).incrDMG < c && (a.getComponent(Gem_1.default).incrDMG = c);
        }
      };
      SlateAncientSlate.prototype.checkSlateAround = function(range) {
        if (this.gameController.slates.length <= 0) return;
        this.listSlateAround = [];
        for (var _i = 0, _a = this.gameController.slates; _i < _a.length; _i++) {
          var a = _a[_i];
          var newDis = cc.pDistance(a.getPosition(), this.node.getPosition());
          var b = range;
          if (newDis <= b) {
            if (a.getComponent(Gem_1.default).pos.x == this.pos.x && a.getComponent(Gem_1.default).pos.y == this.pos.y) continue;
            this.listSlateAround.push(a);
          }
        }
      };
      SlateAncientSlate.prototype.holdEnemy = function() {
        if (this.targetEnemy && this.isCdHoldSkill) {
          this.isCdHoldSkill = false;
          this.targetEnemy.getComponent(Enemy_1.default).stun(2.5);
          var act1 = cc.callFunc(function() {
            this.isCdHoldSkill = true;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(3), act1));
        }
      };
      SlateAncientSlate.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).indexGemCreateBullet = this.index;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], SlateAncientSlate.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], SlateAncientSlate.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], SlateAncientSlate.prototype, "img", void 0);
      SlateAncientSlate = __decorate([ ccclass ], SlateAncientSlate);
      return SlateAncientSlate;
    }(Gem_1.default);
    exports.default = SlateAncientSlate;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  SlateDamageSlate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "123e6cw4t1JQKEcG2vZcRtV", "SlateDamageSlate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SlateDamageSlate = function(_super) {
      __extends(SlateDamageSlate, _super);
      function SlateDamageSlate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.isCdDmgSkill = true;
        _this.listSlateAround = [];
        return _this;
      }
      SlateDamageSlate.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataSlate.length; i++) if (this.gameController.dataSlate[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataSlate[indexx].Level;
        this.listArmorObj = this.gameController.dataSlate[indexx].arrmor;
      };
      SlateDamageSlate.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        if (!this.isbuff) {
          var range = 3 * this.gameController.tileSize * 2 + this.node.height / 2;
          this.checkSlateAround(range);
          this.listSlateAround.length > 0 && this.buffSlateAround(10);
          this.isbuff = true;
        }
        this.checkEnemyAround();
        this.dmgSkill();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      SlateDamageSlate.prototype.dmgSkill = function() {
        if (this.listEnemey.length > 0 && this.isCdDmgSkill) {
          this.isCdDmgSkill = false;
          for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
            var a = _a[_i];
            var dmg = Math.round(10 * this.numSelfKill + 20 * this.gameController.levelPlayer);
            var dmgArmor = dmg * this.armorDmg;
            var incr = Math.round(dmg * this.incrDMG / 100);
            var totalDMG = Math.round(dmg + incr + dmgArmor);
            a.getComponent(Enemy_1.default).takeDame(totalDMG, this.index);
          }
          var act1 = cc.callFunc(function() {
            this.isCdDmgSkill = true;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(1), act1));
        }
      };
      SlateDamageSlate.prototype.buffSlateAround = function(Dmg) {
        for (var _i = 0, _a = this.listSlateAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = Dmg;
          a.getComponent(Gem_1.default).incrDMG < c && (a.getComponent(Gem_1.default).incrDMG = c);
        }
      };
      SlateDamageSlate.prototype.checkSlateAround = function(range) {
        if (this.gameController.slates.length <= 0) return;
        this.listSlateAround = [];
        for (var _i = 0, _a = this.gameController.slates; _i < _a.length; _i++) {
          var a = _a[_i];
          var newDis = cc.pDistance(a.getPosition(), this.node.getPosition());
          var b = range;
          if (newDis <= b) {
            if (a.getComponent(Gem_1.default).pos.x == this.pos.x && a.getComponent(Gem_1.default).pos.y == this.pos.y) continue;
            this.listSlateAround.push(a);
          }
        }
      };
      SlateDamageSlate.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).indexGemCreateBullet = this.index;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], SlateDamageSlate.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], SlateDamageSlate.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], SlateDamageSlate.prototype, "img", void 0);
      SlateDamageSlate = __decorate([ ccclass ], SlateDamageSlate);
      return SlateDamageSlate;
    }(Gem_1.default);
    exports.default = SlateDamageSlate;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  SlateElderSlate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a91ccpamcdDOLSiNy+YuCXQ", "SlateElderSlate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SlateElderSlate = function(_super) {
      __extends(SlateElderSlate, _super);
      function SlateElderSlate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.isCdDmgSkill = true;
        return _this;
      }
      SlateElderSlate.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataSlate.length; i++) if (this.gameController.dataSlate[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataSlate[indexx].Level;
        this.listArmorObj = this.gameController.dataSlate[indexx].arrmor;
      };
      SlateElderSlate.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        if (this.targetEnemy) {
          var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
          if (newDis > this.range()) {
            this.targetEnemy = null;
            this.detectNearestEnemy();
          }
        }
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        this.dmgSkill();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      SlateElderSlate.prototype.chance = function(per) {
        var max = 1 / (per / 100);
        var min = 1;
        var ran = Math.floor(Math.random() * (max - min + 1)) + min;
        return 1 == ran;
      };
      SlateElderSlate.prototype.dmgSkill = function() {
        if (this.listEnemey.length > 0 && this.isCdDmgSkill) {
          this.isCdDmgSkill = false;
          this.chance(5) && this.FrostNova();
          this.chance(5) && this.ThunderClap();
          this.chance(5) && this.FanOfKnives();
          this.chance(5) && this.ShowWave();
          this.chance(5) && this.GoldShoot();
          this.chance(5) && this.ForkedLightning();
          this.chance(100) && this.Posion();
          var act1 = cc.callFunc(function() {
            this.isCdDmgSkill = true;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(1), act1));
        }
      };
      SlateElderSlate.prototype.FrostNova = function() {
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var a = _a[_i];
          var dmg = 300;
          var dmgArmor = dmg * this.armorDmg;
          var incr = Math.round(dmg * this.incrDMG / 100);
          var totalDMG = Math.round(dmg + incr + dmgArmor);
          a.getComponent(Enemy_1.default).takeDame(totalDMG, -1);
        }
      };
      SlateElderSlate.prototype.ThunderClap = function() {
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var a = _a[_i];
          var dmg = 150;
          var dmgArmor = dmg * this.armorDmg;
          var incr = Math.round(dmg * this.incrDMG / 100);
          var totalDMG = Math.round(dmg + incr + dmgArmor);
          a.getComponent(Enemy_1.default).takeDame(totalDMG, -1);
        }
      };
      SlateElderSlate.prototype.FanOfKnives = function() {
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var a = _a[_i];
          var dmg = 150;
          var dmgArmor = dmg * this.armorDmg;
          var incr = Math.round(dmg * this.incrDMG / 100);
          var totalDMG = Math.round(dmg + incr + dmgArmor);
          a.getComponent(Enemy_1.default).takeDame(totalDMG, -1);
        }
      };
      SlateElderSlate.prototype.ShowWave = function() {
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var a = _a[_i];
          var dmg = 200;
          var dmgArmor = dmg * this.armorDmg;
          var incr = Math.round(dmg * this.incrDMG / 100);
          var totalDMG = Math.round(dmg + incr + dmgArmor);
          a.getComponent(Enemy_1.default).takeDame(totalDMG, -1);
        }
      };
      SlateElderSlate.prototype.GoldShoot = function() {
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var a = _a[_i];
          var dmg = this.gameController.gold;
          var dmgArmor = dmg * this.armorDmg;
          var incr = Math.round(dmg * this.incrDMG / 100);
          var totalDMG = Math.round(dmg + incr + dmgArmor);
          a.getComponent(Enemy_1.default).takeDame(totalDMG, -1);
        }
      };
      SlateElderSlate.prototype.ForkedLightning = function() {
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var a = _a[_i];
          var dmg = 200;
          var dmgArmor = dmg * this.armorDmg;
          var incr = Math.round(dmg * this.incrDMG / 100);
          var totalDMG = Math.round(dmg + incr + dmgArmor);
          a.getComponent(Enemy_1.default).takeDame(totalDMG, -1);
        }
      };
      SlateElderSlate.prototype.Posion = function() {
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var a = _a[_i];
          var dmg = 40;
          var dmgArmor = dmg * this.armorDmg;
          var incr = Math.round(dmg * this.incrDMG / 100);
          var totalDMG = Math.round(dmg + incr + dmgArmor);
          a.getComponent(Enemy_1.default).activePosion(dmg, 2);
        }
      };
      SlateElderSlate.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).indexGemCreateBullet = this.index;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], SlateElderSlate.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], SlateElderSlate.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], SlateElderSlate.prototype, "img", void 0);
      SlateElderSlate = __decorate([ ccclass ], SlateElderSlate);
      return SlateElderSlate;
    }(Gem_1.default);
    exports.default = SlateElderSlate;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  SlateHoldSlate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8ce3cEhMpBA5iQoD0g+OqK", "SlateHoldSlate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SlateHoldSlate = function(_super) {
      __extends(SlateHoldSlate, _super);
      function SlateHoldSlate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.isCdDmgSkill = true;
        _this.isCdHoldSkill = true;
        _this.listSlateAround = [];
        return _this;
      }
      SlateHoldSlate.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataSlate.length; i++) if (this.gameController.dataSlate[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataSlate[indexx].Level;
        this.listArmorObj = this.gameController.dataSlate[indexx].arrmor;
      };
      SlateHoldSlate.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        if (!this.isbuff) {
          var range = 3 * this.gameController.tileSize * 2 + this.node.height / 2;
          this.checkSlateAround(range);
          this.listSlateAround.length > 0 && this.buffSlateAround(10);
          this.isbuff = true;
        }
        this.checkEnemyAround();
        this.dmgSkill();
        if (this.targetEnemy) {
          var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
          if (newDis > this.range()) {
            this.targetEnemy = null;
            this.detectNearestEnemy();
          }
        }
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        this.holdEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      SlateHoldSlate.prototype.dmgSkill = function() {
        if (this.listEnemey.length > 0 && this.isCdDmgSkill) {
          this.isCdDmgSkill = false;
          for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
            var a = _a[_i];
            var dmg = Math.round(20 * this.numSelfKill + 60);
            var dmgArmor = dmg * this.armorDmg;
            var incr = Math.round(dmg * this.incrDMG / 100);
            var totalDMG = Math.round(dmg + incr + dmgArmor);
            a.getComponent(Enemy_1.default).takeDame(totalDMG, this.index);
          }
          var act1 = cc.callFunc(function() {
            this.isCdDmgSkill = true;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(1), act1));
        }
      };
      SlateHoldSlate.prototype.buffSlateAround = function(Dmg) {
        for (var _i = 0, _a = this.listSlateAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = Dmg;
          a.getComponent(Gem_1.default).incrDMG < c && (a.getComponent(Gem_1.default).incrDMG = c);
        }
      };
      SlateHoldSlate.prototype.checkSlateAround = function(range) {
        if (this.gameController.slates.length <= 0) return;
        this.listSlateAround = [];
        for (var _i = 0, _a = this.gameController.slates; _i < _a.length; _i++) {
          var a = _a[_i];
          var newDis = cc.pDistance(a.getPosition(), this.node.getPosition());
          var b = range;
          if (newDis <= b) {
            if (a.getComponent(Gem_1.default).pos.x == this.pos.x && a.getComponent(Gem_1.default).pos.y == this.pos.y) continue;
            this.listSlateAround.push(a);
          }
        }
      };
      SlateHoldSlate.prototype.holdEnemy = function() {
        if (this.targetEnemy && this.isCdHoldSkill) {
          this.isCdHoldSkill = false;
          this.targetEnemy.getComponent(Enemy_1.default).stun(1.5);
          var act1 = cc.callFunc(function() {
            this.isCdHoldSkill = true;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(2), act1));
        }
      };
      SlateHoldSlate.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).indexGemCreateBullet = this.index;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], SlateHoldSlate.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], SlateHoldSlate.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], SlateHoldSlate.prototype, "img", void 0);
      SlateHoldSlate = __decorate([ ccclass ], SlateHoldSlate);
      return SlateHoldSlate;
    }(Gem_1.default);
    exports.default = SlateHoldSlate;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  SlateOpalVeinSlate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ccea6qAbl1IfoOnH1/EtxMk", "SlateOpalVeinSlate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SlateOpalVeinSlate = function(_super) {
      __extends(SlateOpalVeinSlate, _super);
      function SlateOpalVeinSlate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.listEnemey4Tile = [];
        _this.listEnemey5Tile = [];
        _this.isCd4Tile = true;
        _this.isCd5Tile = true;
        _this.listSlateAndGemAround = [];
        return _this;
      }
      SlateOpalVeinSlate.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataSlate.length; i++) if (this.gameController.dataSlate[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataSlate[indexx].Level;
        this.listArmorObj = this.gameController.dataSlate[indexx].arrmor;
      };
      SlateOpalVeinSlate.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        if (!this.isbuff) {
          this.isbuff = true;
          var act = cc.callFunc(function() {
            var range = 4 * this.gameController.tileSize * 2 + this.node.height / 2;
            this.checkGemAndSlateAround(range);
            this.listSlateAndGemAround.length > 0 && this.buffGemsAround(10);
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(.3), act));
        }
        this.checkEnemyAround();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act2 = cc.callFunc(function() {
            this.listEnemey.length > 0 && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      SlateOpalVeinSlate.prototype.buffGemsAround = function(SDP) {
        for (var _i = 0, _a = this.listSlateAndGemAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = void 0;
          c = a.getComponent(Gem_1.default).BuffByOpal > 0 ? SDP + a.getComponent(Gem_1.default).BuffByOpal : SDP;
          a.getComponent(Gem_1.default).incrSDP < c && (a.getComponent(Gem_1.default).incrSDP = c);
        }
      };
      SlateOpalVeinSlate.prototype.checkGemAndSlateAround = function(range) {
        if (this.gameController.slates.length <= 0) return;
        this.listSlateAndGemAround = [];
        for (var _i = 0, _a = this.gameController.slates; _i < _a.length; _i++) {
          var a = _a[_i];
          var newDis = cc.pDistance(a.getPosition(), this.node.getPosition());
          var b = range;
          if (newDis <= b) {
            if (a.getComponent(Gem_1.default).pos.x == this.pos.x && a.getComponent(Gem_1.default).pos.y == this.pos.y) continue;
            this.listSlateAndGemAround.push(a);
          }
        }
        for (var _b = 0, _c = this.gameController.gems; _b < _c.length; _b++) {
          var a = _c[_b];
          var newDis = cc.pDistance(a.getPosition(), this.node.getPosition());
          var b = range;
          if (newDis <= b) {
            if (a.getComponent(Gem_1.default).pos.x == this.pos.x && a.getComponent(Gem_1.default).pos.y == this.pos.y) continue;
            this.listSlateAndGemAround.push(a);
          }
        }
      };
      SlateOpalVeinSlate.prototype.shoot = function() {
        if (!this.listEnemey) return;
        if (this.currentLevel != this.listLevelObj.length) {
          var numRemove = this.listEnemey.length - 3;
          for (var i = 0; i < numRemove; i++) for (var j = 0; j < this.listEnemey.length; j++) if (this.listEnemey[j].getComponent(Enemy_1.default).index == this.listEnemey.length) {
            this.listEnemey.splice(j, 1);
            break;
          }
        }
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var e = _a[_i];
          var bullet = cc.instantiate(this.bulletPrefab);
          bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
          bullet.getComponent(Bullet_1.default).target = e;
          bullet.getComponent(Bullet_1.default).damage = this.damage();
          bullet.getComponent(Bullet_1.default).indexTarget = e.getComponent(Enemy_1.default).index;
          this.gameController.mapController.node.addChild(bullet);
        }
      };
      __decorate([ property(cc.Prefab) ], SlateOpalVeinSlate.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], SlateOpalVeinSlate.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], SlateOpalVeinSlate.prototype, "img", void 0);
      SlateOpalVeinSlate = __decorate([ ccclass ], SlateOpalVeinSlate);
      return SlateOpalVeinSlate;
    }(Gem_1.default);
    exports.default = SlateOpalVeinSlate;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  SlatePoisonSlate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4a8ed6AUR1Op4Dbzqy+SJ9m", "SlatePoisonSlate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SlatePoisonSlate = function(_super) {
      __extends(SlatePoisonSlate, _super);
      function SlatePoisonSlate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.isCdDmgSkill = true;
        return _this;
      }
      SlatePoisonSlate.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataSlate.length; i++) if (this.gameController.dataSlate[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataSlate[indexx].Level;
        this.listArmorObj = this.gameController.dataSlate[indexx].arrmor;
      };
      SlatePoisonSlate.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        this.dmgSkill();
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      SlatePoisonSlate.prototype.dmgSkill = function() {
        if (this.listEnemey.length > 0 && this.isCdDmgSkill) {
          this.isCdDmgSkill = false;
          for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
            var a = _a[_i];
            a.getComponent(Enemy_1.default).activePosion(this.damagePosion(), this.timeActive());
          }
          var act1 = cc.callFunc(function() {
            this.isCdDmgSkill = true;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(.5), act1));
        }
      };
      SlatePoisonSlate.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).indexGemCreateBullet = this.index;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], SlatePoisonSlate.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], SlatePoisonSlate.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], SlatePoisonSlate.prototype, "img", void 0);
      SlatePoisonSlate = __decorate([ ccclass ], SlatePoisonSlate);
      return SlatePoisonSlate;
    }(Gem_1.default);
    exports.default = SlatePoisonSlate;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  SlateRangeSlate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ad534yyHVVMp5jPq6ZhAZmZ", "SlateRangeSlate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Enemy_1 = require("./Enemy");
    var Bullet_1 = require("./Bullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SlateRangeSlate = function(_super) {
      __extends(SlateRangeSlate, _super);
      function SlateRangeSlate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      SlateRangeSlate.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataSlate.length; i++) if (this.gameController.dataSlate[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataSlate[indexx].Level;
        this.listArmorObj = this.gameController.dataSlate[indexx].arrmor;
      };
      SlateRangeSlate.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act2 = cc.callFunc(function() {
            this.listEnemey.length > 0 && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      SlateRangeSlate.prototype.shoot = function() {
        if (!this.listEnemey) return;
        if (this.currentLevel != this.listLevelObj.length) {
          var numRemove = this.listEnemey.length - 3;
          for (var i = 0; i < numRemove; i++) for (var j = 0; j < this.listEnemey.length; j++) if (this.listEnemey[j].getComponent(Enemy_1.default).index == this.listEnemey.length) {
            this.listEnemey.splice(j, 1);
            break;
          }
        }
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var e = _a[_i];
          var bullet = cc.instantiate(this.bulletPrefab);
          bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
          bullet.getComponent(Bullet_1.default).target = e;
          bullet.getComponent(Bullet_1.default).damage = this.damage();
          bullet.getComponent(Bullet_1.default).indexTarget = e.getComponent(Enemy_1.default).index;
          this.gameController.mapController.node.addChild(bullet);
        }
      };
      __decorate([ property(cc.Prefab) ], SlateRangeSlate.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], SlateRangeSlate.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], SlateRangeSlate.prototype, "img", void 0);
      SlateRangeSlate = __decorate([ ccclass ], SlateRangeSlate);
      return SlateRangeSlate;
    }(Gem_1.default);
    exports.default = SlateRangeSlate;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  SlateSlowSlate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2945p3JI5JprlOrqNE+Qha", "SlateSlowSlate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Enemy_1 = require("./Enemy");
    var Bullet_1 = require("./Bullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SlateSlowSlate = function(_super) {
      __extends(SlateSlowSlate, _super);
      function SlateSlowSlate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        return _this;
      }
      SlateSlowSlate.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataSlate.length; i++) if (this.gameController.dataSlate[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataSlate[indexx].Level;
        this.listArmorObj = this.gameController.dataSlate[indexx].arrmor;
      };
      SlateSlowSlate.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act2 = cc.callFunc(function() {
            this.listEnemey.length > 0 && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      SlateSlowSlate.prototype.shoot = function() {
        if (!this.listEnemey) return;
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var e = _a[_i];
          var bullet = cc.instantiate(this.bulletPrefab);
          bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
          bullet.getComponent(Bullet_1.default).target = e;
          bullet.getComponent(Bullet_1.default).damage = this.damage();
          bullet.getComponent(Bullet_1.default).indexTarget = e.getComponent(Enemy_1.default).index;
          bullet.getComponent(Bullet_1.default).slow = 15;
          bullet.getComponent(Bullet_1.default).timeActive = -1;
          this.gameController.mapController.node.addChild(bullet);
        }
      };
      __decorate([ property(cc.Prefab) ], SlateSlowSlate.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], SlateSlowSlate.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], SlateSlowSlate.prototype, "img", void 0);
      SlateSlowSlate = __decorate([ ccclass ], SlateSlowSlate);
      return SlateSlowSlate;
    }(Gem_1.default);
    exports.default = SlateSlowSlate;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  SlateSpellSlate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ace62u56f1FQIQQGxCX/xGF", "SlateSpellSlate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SlateSpellSlate = function(_super) {
      __extends(SlateSpellSlate, _super);
      function SlateSpellSlate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.isCdDmgSkill = true;
        return _this;
      }
      SlateSpellSlate.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataSlate.length; i++) if (this.gameController.dataSlate[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataSlate[indexx].Level;
        this.listArmorObj = this.gameController.dataSlate[indexx].arrmor;
      };
      SlateSpellSlate.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        this.checkEnemyAround();
        if (this.targetEnemy) {
          var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
          if (newDis > this.range()) {
            this.targetEnemy = null;
            this.detectNearestEnemy();
          }
        }
        (!this.targetEnemy || "" == this.targetEnemy.name || this.targetEnemy.getComponent(Enemy_1.default).isDie) && this.listEnemey.length > 0 && this.detectNearestEnemy();
        this.dmgSkill();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act2 = cc.callFunc(function() {
            var newDis = cc.pDistance(this.targetEnemy.getPosition(), this.node.getPosition());
            if (newDis > this.range()) {
              this.targetEnemy = null;
              this.detectNearestEnemy();
            }
            this.targetEnemy && "" != this.targetEnemy.name && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      SlateSpellSlate.prototype.chance = function(per) {
        var max = 1 / (per / 100);
        var min = 1;
        var ran = Math.floor(Math.random() * (max - min + 1)) + min;
        return 1 == ran;
      };
      SlateSpellSlate.prototype.dmgSkill = function() {
        if (this.listEnemey.length > 0 && this.isCdDmgSkill) {
          this.isCdDmgSkill = false;
          this.chance(5) && this.FrostNova();
          this.chance(5) && this.FanOfKnives();
          this.chance(5) && this.Lightning();
          this.chance(5) && this.CarrionSwarm();
          this.chance(5) && this.TakeGold();
          var act1 = cc.callFunc(function() {
            this.isCdDmgSkill = true;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(1), act1));
        }
      };
      SlateSpellSlate.prototype.FrostNova = function() {
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var a = _a[_i];
          var dmg = 100;
          var dmgArmor = dmg * this.armorDmg;
          var incr = Math.round(dmg * this.incrDMG / 100);
          var totalDMG = Math.round(dmg + incr + dmgArmor);
          a.getComponent(Enemy_1.default).takeDame(totalDMG, -1);
        }
      };
      SlateSpellSlate.prototype.FanOfKnives = function() {
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var a = _a[_i];
          var dmg = 80;
          var dmgArmor = dmg * this.armorDmg;
          var incr = Math.round(dmg * this.incrDMG / 100);
          var totalDMG = Math.round(dmg + incr + dmgArmor);
          a.getComponent(Enemy_1.default).takeDame(totalDMG, -1);
        }
      };
      SlateSpellSlate.prototype.Lightning = function() {
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var a = _a[_i];
          var dmg = 85;
          var dmgArmor = dmg * this.armorDmg;
          var incr = Math.round(dmg * this.incrDMG / 100);
          var totalDMG = Math.round(dmg + incr + dmgArmor);
          a.getComponent(Enemy_1.default).takeDame(totalDMG, -1);
        }
      };
      SlateSpellSlate.prototype.CarrionSwarm = function() {
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var a = _a[_i];
          var dmg = 125;
          var dmgArmor = dmg * this.armorDmg;
          var incr = Math.round(dmg * this.incrDMG / 100);
          var totalDMG = Math.round(dmg + incr + dmgArmor);
          a.getComponent(Enemy_1.default).takeDame(totalDMG, -1);
        }
      };
      SlateSpellSlate.prototype.TakeGold = function() {
        this.gameController.gold += 3;
        this.gameController.updateUi();
      };
      SlateSpellSlate.prototype.shoot = function() {
        if (!this.targetEnemy) return;
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
        bullet.getComponent(Bullet_1.default).target = this.targetEnemy;
        bullet.getComponent(Bullet_1.default).indexGemCreateBullet = this.index;
        bullet.getComponent(Bullet_1.default).damage = this.damage();
        bullet.getComponent(Bullet_1.default).indexTarget = this.targetEnemy.getComponent(Enemy_1.default).index;
        this.gameController.mapController.node.addChild(bullet);
      };
      __decorate([ property(cc.Prefab) ], SlateSpellSlate.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], SlateSpellSlate.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], SlateSpellSlate.prototype, "img", void 0);
      SlateSpellSlate = __decorate([ ccclass ], SlateSpellSlate);
      return SlateSpellSlate;
    }(Gem_1.default);
    exports.default = SlateSpellSlate;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  SlateViperSlate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "06fc3vGFy5Fw65fBZX0Kuzd", "SlateViperSlate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gem_1 = require("./Gem");
    var Bullet_1 = require("./Bullet");
    var Enemy_1 = require("./Enemy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SlateViperSlate = function(_super) {
      __extends(SlateViperSlate, _super);
      function SlateViperSlate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.turret = null;
        _this.img = null;
        _this.nearestEnemy = null;
        _this.targetEnemy = null;
        _this.listEnemey4Tile = [];
        _this.listEnemey5Tile = [];
        _this.isCd4Tile = true;
        _this.isCd5Tile = true;
        _this.listSlateAndGemAround = [];
        return _this;
      }
      SlateViperSlate.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.icon = this.img;
        var indexx = 0;
        for (var i = 0; i < this.gameController.dataSlate.length; i++) if (this.gameController.dataSlate[i].Name.toString().toLocaleLowerCase() === this.node.name.toString().toLocaleLowerCase()) {
          indexx = i;
          break;
        }
        this.listLevelObj = this.gameController.dataSlate[indexx].Level;
        this.listArmorObj = this.gameController.dataSlate[indexx].arrmor;
      };
      SlateViperSlate.prototype.update = function() {
        if (!this.gameController.isActiveWay) return;
        if (!this.isCanAttack()) return;
        if (!this.isbuff) {
          var range = 4 * this.gameController.tileSize * 2 + this.node.height / 2;
          this.checkGemAndSlateAround(range);
          this.listSlateAndGemAround.length > 0 && this.buffGemsAround(10);
          this.isbuff = true;
        }
        this.checkEnemyAround();
        this.checkEnemyAround4And5Tile();
        (this.listEnemey4Tile.length > 0 || this.listEnemey5Tile.length > 0) && this.Dealing4And5Tile();
        if (this.damage() > 0 && this.listEnemey.length > 0 && this.isCdShoot) {
          this.isCdShoot = false;
          var tempTime = this.cdActiveSkill();
          this.timeCd = tempTime - tempTime * this.incrSDP / 100;
          this.timeCd < this.maxCd && (this.timeCd = this.maxCd);
          var act2 = cc.callFunc(function() {
            this.listEnemey.length > 0 && this.shoot();
          }, this);
          var cdskill = cc.callFunc(function() {
            this.isCdShoot = true;
          }, this);
          this.node.runAction(cc.sequence(act2, cc.delayTime(this.timeCd), cdskill));
        }
      };
      SlateViperSlate.prototype.Dealing4And5Tile = function() {
        if (this.listEnemey4Tile.length > 0 && this.isCd4Tile) {
          this.isCd4Tile = false;
          for (var _i = 0, _a = this.listEnemey4Tile; _i < _a.length; _i++) {
            var a = _a[_i];
            var dmg = 30;
            var dmgArmor = dmg * this.armorDmg;
            var incr = Math.round(dmg * this.incrDMG / 100);
            var totalDMG = Math.round(dmg + incr + dmgArmor);
            a.getComponent(Enemy_1.default).takeDame(totalDMG, -1);
          }
          var act1 = cc.callFunc(function() {
            this.isCd4Tile = true;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(.5), act1));
        }
        if (this.listEnemey5Tile.length > 0 && this.isCd5Tile) {
          this.isCd5Tile = false;
          for (var _b = 0, _c = this.listEnemey5Tile; _b < _c.length; _b++) {
            var a = _c[_b];
            var dmg = 50;
            var dmgArmor = dmg * this.armorDmg;
            var incr = Math.round(dmg * this.incrDMG / 100);
            var totalDMG = Math.round(dmg + incr + dmgArmor);
            a.getComponent(Enemy_1.default).takeDame(dmg, -1);
          }
          var act1 = cc.callFunc(function() {
            this.isCd5Tile = true;
          }, this);
          this.node.runAction(cc.sequence(cc.delayTime(1), act1));
        }
      };
      SlateViperSlate.prototype.buffGemsAround = function(Dmg) {
        for (var _i = 0, _a = this.listSlateAndGemAround; _i < _a.length; _i++) {
          var a = _a[_i];
          var c = Dmg;
          a.getComponent(Gem_1.default).incrDMG < c && (a.getComponent(Gem_1.default).incrDMG = c);
        }
      };
      SlateViperSlate.prototype.checkGemAndSlateAround = function(range) {
        if (this.gameController.slates.length <= 0) return;
        this.listSlateAndGemAround = [];
        for (var _i = 0, _a = this.gameController.slates; _i < _a.length; _i++) {
          var a = _a[_i];
          var newDis = cc.pDistance(a.getPosition(), this.node.getPosition());
          var b = range;
          if (newDis <= b) {
            if (a.getComponent(Gem_1.default).pos.x == this.pos.x && a.getComponent(Gem_1.default).pos.y == this.pos.y) continue;
            this.listSlateAndGemAround.push(a);
          }
        }
        for (var _b = 0, _c = this.gameController.gems; _b < _c.length; _b++) {
          var a = _c[_b];
          var newDis = cc.pDistance(a.getPosition(), this.node.getPosition());
          var b = range;
          if (newDis <= b) {
            if (a.getComponent(Gem_1.default).pos.x == this.pos.x && a.getComponent(Gem_1.default).pos.y == this.pos.y) continue;
            this.listSlateAndGemAround.push(a);
          }
        }
      };
      SlateViperSlate.prototype.checkEnemyAround4And5Tile = function() {
        this.listEnemey4Tile = [];
        this.listEnemey5Tile = [];
        if (this.gameController.enemys.length <= 0) return;
        var range4Tile = 4 * this.gameController.tileSize * 2 + this.node.height / 2;
        for (var _i = 0, _a = this.gameController.enemys; _i < _a.length; _i++) {
          var enemy = _a[_i];
          var newDis = cc.pDistance(enemy.getPosition(), this.node.getPosition());
          newDis <= range4Tile && !enemy.getComponent(Enemy_1.default).isDie && this.listEnemey4Tile.push(enemy);
        }
        var range5Tile = 5 * this.gameController.tileSize * 2 + this.node.height / 2;
        for (var _b = 0, _c = this.gameController.enemys; _b < _c.length; _b++) {
          var enemy = _c[_b];
          var newDis = cc.pDistance(enemy.getPosition(), this.node.getPosition());
          newDis <= range4Tile && !enemy.getComponent(Enemy_1.default).isDie && this.listEnemey5Tile.push(enemy);
        }
      };
      SlateViperSlate.prototype.shoot = function() {
        if (!this.listEnemey) return;
        if (this.currentLevel != this.listLevelObj.length) {
          var numRemove = this.listEnemey.length - 3;
          for (var i = 0; i < numRemove; i++) for (var j = 0; j < this.listEnemey.length; j++) if (this.listEnemey[j].getComponent(Enemy_1.default).index == this.listEnemey.length) {
            this.listEnemey.splice(j, 1);
            break;
          }
        }
        for (var _i = 0, _a = this.listEnemey; _i < _a.length; _i++) {
          var e = _a[_i];
          var bullet = cc.instantiate(this.bulletPrefab);
          bullet.setPosition(cc.pAdd(this.node.getPosition(), this.turret.getPosition()));
          bullet.getComponent(Bullet_1.default).target = e;
          bullet.getComponent(Bullet_1.default).damage = this.damage();
          bullet.getComponent(Bullet_1.default).indexTarget = e.getComponent(Enemy_1.default).index;
          this.gameController.mapController.node.addChild(bullet);
        }
      };
      __decorate([ property(cc.Prefab) ], SlateViperSlate.prototype, "bulletPrefab", void 0);
      __decorate([ property(cc.Node) ], SlateViperSlate.prototype, "turret", void 0);
      __decorate([ property(cc.SpriteFrame) ], SlateViperSlate.prototype, "img", void 0);
      SlateViperSlate = __decorate([ ccclass ], SlateViperSlate);
      return SlateViperSlate;
    }(Gem_1.default);
    exports.default = SlateViperSlate;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy",
    "./Gem": "Gem"
  } ],
  SplashBullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "58c62COWsZMJosl+/VkOe6r", "SplashBullet");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enemy_1 = require("./Enemy");
    var Bullet_1 = require("./Bullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SplashBullet = function(_super) {
      __extends(SplashBullet, _super);
      function SplashBullet() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.endPos = null;
        _this.activeExp = false;
        _this.collider = null;
        _this.ani = null;
        _this.splashTile = 1;
        _this.gameController = null;
        return _this;
      }
      SplashBullet.prototype.onLoad = function() {
        this.ani = this.getComponent(cc.Animation);
        this.endPos = this.target.getPosition();
        var oldPos = this.node.getPosition();
        var targetUpdate = this.target.getPosition();
        this.direction = cc.pNormalize(cc.pSub(targetUpdate, oldPos));
        this.collider = this.node.getComponent(cc.BoxCollider);
        this.collider.enabled = false;
      };
      SplashBullet.prototype.update = function(dt) {
        this.target.name || this.node.destroy();
        var range;
        "SilverExplosion" === this.nameExplosion ? range = cc.pDistance(this.node.getPosition(), this.target.getPosition()) : "RubyExplosion" === this.nameExplosion && (range = cc.pDistance(this.node.getPosition(), this.endPos));
        this.target && (range > 10 ? "SilverExplosion" === this.nameExplosion ? this.bulletTarget() : "RubyExplosion" === this.nameExplosion && this.bulletTargetStay() : this.activeExp || this.explosion());
      };
      SplashBullet.prototype.explosion = function() {
        this.activeExp = true;
        var size = this.splashTile * this.gameController.tileSize * 2;
        this.node.setContentSize(size, size);
        this.collider.size.width = size;
        this.collider.size.height = size;
        this.collider.enabled = true;
        this.node.runAction(cc.sequence(cc.delayTime(.05), cc.callFunc(function() {
          this.ani.play(this.nameExplosion);
          this.collider.enabled = false;
        }, this)));
        this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
          this.node.destroy();
        }, this)));
      };
      SplashBullet.prototype.onCollisionEnter = function(other, self) {
        this.checkColli(other, self);
        if ("1" != other.tag || !this.activeExp) return;
        other.node.getComponent(Enemy_1.default) && (other.node.getComponent(Enemy_1.default).isDie || other.node.getComponent(Enemy_1.default).index == this.indexTarget || other.node.getComponent(Enemy_1.default).takeDame(this.damage, this.indexGemCreateBullet));
      };
      SplashBullet = __decorate([ ccclass ], SplashBullet);
      return SplashBullet;
    }(Bullet_1.default);
    exports.default = SplashBullet;
    cc._RF.pop();
  }, {
    "./Bullet": "Bullet",
    "./Enemy": "Enemy"
  } ],
  Stone: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55adaGrlSpDvoaWYtkt5Sly", "Stone");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Stone = function(_super) {
      __extends(Stone, _super);
      function Stone() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pos = null;
        _this.posSquare = [];
        _this.gameController = null;
        return _this;
      }
      Stone.prototype.onLoad = function() {};
      Stone.prototype.addTouch = function() {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function(event) {
          if (self.gameController.isActiveWay) return;
          self.gameController.stonePick = self;
          self.gameController.btnRemoveStone.active = true;
        }, self.node);
      };
      Stone = __decorate([ ccclass ], Stone);
      return Stone;
    }(cc.Component);
    exports.default = Stone;
    cc._RF.pop();
  }, {} ],
  Tile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33556h5655HYqUDY554I5x4", "Tile");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Tile = function() {
      function Tile() {
        this.hasGem = false;
        this.hasSlate = false;
        this.hasStone = false;
        this.hasMile = false;
        this.pos = null;
      }
      Tile = __decorate([ ccclass ], Tile);
      return Tile;
    }();
    exports.default = Tile;
    cc._RF.pop();
  }, {} ],
  TouchEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "062afCndD5Lu56Fxmsu389k", "TouchEvent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TouchEvent = function(_super) {
      __extends(TouchEvent, _super);
      function TouchEvent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.target = null;
        return _this;
      }
      TouchEvent.prototype.onLoad = function() {
        this.node.on(cc.Node.EventType.TOUCH_END, function() {
          this.setActive();
        }, this);
      };
      TouchEvent.prototype.setActive = function() {
        this.target && (this.target.active = !this.target.active);
      };
      __decorate([ property(cc.Node) ], TouchEvent.prototype, "target", void 0);
      TouchEvent = __decorate([ ccclass ], TouchEvent);
      return TouchEvent;
    }(cc.Component);
    exports.default = TouchEvent;
    cc._RF.pop();
  }, {} ]
}, {}, [ "ATile", "Bullet", "BulletPosion", "CameraControl", "Enemy", "GameController", "Gem", "GemAmethyst", "GemAquamarine", "GemBlackOpal", "GemBloodStone", "GemDarkEmerald", "GemDiamon", "GemEmerald", "GemGold", "GemJade", "GemMalachite", "GemOpal", "GemParaibaTourmaline", "GemPinkDiamond", "GemRedCrysta", "GemRuby", "GemSapphire", "GemSilver", "GemStarRuby", "GemTopaz", "GemUranium238", "GemYellowSapphire", "HitDamage", "InitData", "ManagerUi", "MapController", "SlateAirSlate", "SlateAncientSlate", "SlateDamageSlate", "SlateElderSlate", "SlateHoldSlate", "SlateOpalVeinSlate", "SlatePoisonSlate", "SlateRangeSlate", "SlateSlowSlate", "SlateSpellSlate", "SlateViperSlate", "SplashBullet", "Stone", "Tile", "TouchEvent" ]);
//# sourceMappingURL=project.dev.js.map