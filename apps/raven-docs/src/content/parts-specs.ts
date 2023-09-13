const partsSpecs = {
  id: 'Unique ID for the part/unit.',
  name: 'Name of the part/unit.',
  regulationVersion: 'Regulation version for the part/unit specs.',
  abEnConsumption: 'EN consumed by Assault Boost.',
  abThrust:
    'Thrust of Assault Boost movement.\n\nHigher values correspond to swifter rush attacks.',
  accumulativeImpact:
    'Accumulative ACS overload performance.\n\nThis corresponds to sustained ACS strain, which is alleviated over time.',
  ammunitionCost:
    'Cost per round fired.\n\nAt the end of each mission, the total number of rounds fired is used to calculate ammunition expenses.',
  antiEnergyDefense: 'Defense rating against energy damage.',
  antiExplosiveDefense: 'Defense rating against explosive/incendiary damage.',
  antiKineticDefense: 'Defense rating against kinetic damage.',
  ap: 'Resilience of the part.',
  armsLoadLimit:
    'Maximum weight arms can carry without compromising on stable operating performance.\n\nHigher values make it easier to manipulate arm weapons, mitigating dips in target tracking and recoil control caused by overload.',
  atkHeatBuildup:
    'Heat buildup when attacking.\n\nOverheat occurs when value exceeds the maximum tolerance.',
  attackCount: 'Number of projectiles/submunitions per attack.',
  attackPower:
    'Damage-dealing performance.\n\nDamage output can decrease due to factors such as attenuation over distance, or when ricocheting occurs.',
  attitudeStability:
    'The maximum load the ACS can support.\n\nThe higher this value, the less likely the AC is to stagger.',
  blastRadius: 'Size of resulting explosions.',
  boosterEfficiencyAdj:
    'Adjustment to booster EN efficiency.\n\nThe higher this value, the less EN consumed by Quick Boost.',
  chargeTime: 'The time it takes to complete charging.',
  chgAccumImpact:
    'Accumulative ACS overload performance for charge attacks.\n\nThis corresponds to sustained ACS strain, which is alleviated over time.',
  chgAmmoConsumption: 'Ammunition consumed by charge attacks.',
  chgAttackCount: 'Number of projectiles/submunitions per charge attack.',
  chgAttackPower:
    'Damage-dealing performance for charge attacks.\n\nDamage output can decrease due to factors such as attenuation over distance, or when ricocheting occurs.',
  chgBlastRadius: 'Size of explosions resulting from charge attacks.',
  chgEnLoad:
    'EN load when charging.\n\nEN is reduced if this value exceeds supply.',
  chgHeatBuildup:
    'Heat buildup when using charge attacks.\n\nOverhead occurs when value exceeds the maximum tolerance.',
  chgImpact:
    'ACS overload performance for charge attacks.\n\nThis corresponds to immediate ACS strain, which resets within a short period of time.',
  closeRangeAssist:
    'Aiming assistance performance at close range.\n\nHigher values improve aim when targeting enemies at close range (within 130 m).',
  consecutiveHits: 'Number of chain attacks possible with additional inputs.',
  cooling: 'Speed at which head buildup is reduced when cooling weapon.',
  damageMitigation:
    'Ability to mitigate incoming damage while performing a regular guard.',
  deploymentRange: 'Area in which shield is capable of blocking attacks.',
  directHitAdjustment: 'Damage multiplier when attacking a staggered enemy.',
  dplyHeatBuildup:
    'Heat buildup when deploying shield.\n\nOverheating occurs when value exceeds the maximum tolerance.',
  duration: 'Duration of the barrier produced.',
  effectiveRange:
    'Range at which attacks are effective.\n\nThis is based on the armor of standard ACs and can vary depending on the defenses of the target.',
  effectRange:
    'Range corresponding to the furthest reach of explosions.\n\nPower and impact of the explosion are reduced at this range, but enemy fire is still cancelled out.',
  enCapacity:
    'Total amount of EN available for use.\n\nHigher values enable heavy use of EN-consuming actions.',
  energyFirearmSpec:
    'Efficiency of EN output diverted to ranged energy weapons.\n\nHigher values correspond to greater attack power and reduced charging time for weapons affected by this spec.\n\nThis spec does not affect weapons with independent EN output systems, such as melee weapons or plasma missile launchers.',
  enLoad: 'EN load of the part.',
  enOutput:
    'Generator EN output.\n\nHigher values mean that the generator can support more high-burden parts, with the leftover output improving EN recovery speed.',
  enRecharge:
    'The ability of the generator to initiate EN recharge.\n\nThe higher this value, the more quickly the generator commences recovery after an EN-consuming action.',
  firearmSpecialization:
    'Suitability for using firearms.\n\nHigher values improve target tracking performance.',
  fullChgAccumImpact:
    'Accumulative ACS overload performance for full-charge attacks.\n\nThis corresponds to sustained ACS strain, which is alleviated over time.',
  fullChgAmmoConsump: 'Ammunition consumed by full-charge attacks.',
  fullChgAttackPower:
    'Damage-dealing performance of full-charge attacks.\n\nDamage output can decrease due to factors such as attenuation over distance, or when ricocheting occurs.',
  fullChgHeatBuildup:
    'Heat buildup when using full-charge attacks.\n\nOverhead occurs when value exceeds the maximum tolerance.',
  fullChgImpact:
    'ACS overload performance for full-charge attacks.\n\nThis corresponds to immediate ACS strain, which resets within a short period of time.',
  fullChgTime: 'Time it takes to reach full charge.',
  generatorOutputAdj:
    'Adjustment to generator EN output.\n\nThe higher this value, the greater the final EN output of the generator.',
  generatorSupplyAdj:
    'Adjustment to generator EN supply performance.\n\nThe higher this value, the more quickly the generator resumes supply after an EN-consuming action.',
  guidance: 'Tracking performance of missiles and other homing weapons.',
  highSpeedPerf: 'Speed while boost is engaged.',
  homingLockTime:
    'Time it takes to acquire lock-on for missiles and other homing weapons.\n\nAchieve optimal tracking performance by keeping enemies in your sights for this duration.',
  idealRange:
    "Range at which attack power is guaranteed without ricocheting.\n\nApplies regardless of the target's defenses, with the exception of some special armor.",
  idleDamageMitigation:
    'Damage mitigation for attacks caught by guard while shield is in an idle state.',
  idleImpactMitigation:
    'ACS strain mitigation for attacks caught by guard while shield is in an idle state.',
  idleTime: 'Time until idle state ends.',
  igDamageMitigation:
    'Ability to mitigate incoming damage while performing an Initial Guard.',
  igDuration: 'Duration of the Initial Guard damage mitigation window.',
  igImpactDampening:
    'Ability to mitigate incoming ACS burden while performing an Initial Guard.',
  igImpactMitigation:
    'Ability to mitigate ACS strain while performing an Initial Guard.',
  impact:
    'ACS overload performance.\n\nThis corresponds to immediate ACS strain, which resets within a short period of time.',
  impactDampening:
    'Ability to mitigate incoming ACS burden while performing a regular guard.',
  jumpDistance:
    'Horizontal jumping performance.\n\nHigher values correspond to higher initial speed of Quick Boost from the ground.',
  jumpHeight:
    'Vertical jumping performance.\n\nHigher values correspond to higher maximum heights of jumps from the ground.',
  loadLimit:
    'Maximum weight legs can support.\n\nHigher values mean that the legs can support more heavy parts.',
  longRangeAssist:
    'Aiming assistance performance at long range.\n\nHigher values improve aim when targeting enemies at long range (beyond 260 m).',
  magazineRounds: 'Number of rounds loaded per magazine.',
  maxLockCount:
    'Maximum possible number of lock-ons for missiles and other homing weapons.\n\nMulti-lock is possible if this number is 2 or higher.',
  mediumRangeAssist:
    'Aiming assistance performance at medium range.\n\nHigher values improve aim when targeting enemies at medium range (130-260 m).',
  meleeAtkEnConsump:
    'EN consumed by movement resulting from use of melee weapon.',
  meleeAttackThrust:
    'Thrust when homing in on enemies using melee weapons.\n\nMost melee weapons are capable of homing in on enemies within certain ranges. This value increases the speed of those homing attacks.',
  meleeSpecialization:
    'Suitability for using melee weapons.\n\nHigher values corresponding to greater attack power.',
  missileLockCorrection:
    'Modifier for the time it takes to acquire lock-on for missiles and other homing weapons.\n\nThe higher the value, the less time required to complete lock-on.',
  multiLockCorrection:
    'Modifier for the time it takes to acquire multiple lock-ons for missiles and other homing weapons.\n\nThe higher the value, the less time required to complete lock-ons.',
  paInterference:
    'Ability to interfere with enemy pulse barriers.\n\nThe higher this value, the easier it is to break down pulse armor or shielding.',
  postRecoveryEnSupply:
    'Amount of EN that is immediately recharged after generator EN supply has been restored.\n\nHigher values correspond to greater initial EN recharge after the generator recovers from complete EN depletion, enabling heavy use of EN-consuming actions following recovery.',
  qbEnConsumption: 'EN consumed by Quick Boost.',
  qbJetDuration:
    'Duration of Quick Boost jets.\n\nHigher values correspond to greater distance traveled.',
  qbReloadIdealWeight:
    'Maximum tolerable AC weight before Quick Boost reload time is compromised.\n\nHigher values can support heavier ACs without suffering reduced performance.',
  qbReloadTime:
    'Reload time for Quick Boost.\n\nLower values enable agile, consecutive usage.',
  qbThrust:
    'Initial thrust of Quick Boost movement.\n\nHigher values correspond to greater initial speed.',
  rapidFire:
    'Speed of rapid fire.\n\nThis is the number of rounds that can be fired within 1 second.',
  recoil: 'Recoil that occurs when firing.',
  recoilControl:
    'Ability to absorb recoil.\n\nHigher values mitigate accuracy reduction incurred by rapid fire.',
  reloadTime: 'Time from start to completion of reload.',
  resilience: 'Resilience of the barrier produced.',
  scanDistance:
    'Range within which scanning can detect enemies or part containers.',
  scanEffectDuration:
    'Scan visibility duration after having detected enemies or part containers.',
  supplyRecovery:
    'The ability of the generator to recover after interruption of EN supply.\n\nThe higher this value, the more quickly the generator commences recovery after EN is fully depleted.',
  systemRecovery:
    'Ability to detect system abnormalities and recover.\n\nHigher values correspond to lower vulnerability to system abnormalities',
  thrust:
    'Thrust of boost movement.\n\nHigher values correspond to greater movement speed.',
  totalRound: 'Total number of rounds that can be fired.',
  travelSpeed: 'Speed while boost is disengaged.',
  upwardEnConsumption: 'EN consumed by ascending boost movement.',
  upwardThrust:
    'Vertical thrust of boost movement.\n\nHigher values correspond to greater ascending speed.',
  weight: 'Weight of the part.',
}

export default partsSpecs
