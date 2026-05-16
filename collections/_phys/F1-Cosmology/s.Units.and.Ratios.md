---
title: Units Commonly Used in Astronomy and Cosmology
categories: Sheet
subclass: Cosmology
---

## Introduction

Astronomy and cosmology use a mixed unit culture. The formal reference system is the International System of Units, but astronomical practice also relies on CGS units, angular units, logarithmic photometric units, detector-defined pipeline units, and cosmological convention units such as $$h^{-1}\,\mathrm{Mpc}$$. These units survive because astronomical observables span enormous ranges: sub-microarcsecond astrometry, electron counts on detectors, stellar radii, galactic kiloparsecs, cosmological gigaparsecs, radio flux densities in janskys, and X-ray photon energies in keV.

This article is a working map of those units. It gives definitions, conversions, proportional scaffolds, intuitive anchors, and common error checks. It is meant to help readers move between geometry, radiation, dynamics, spectroscopy, detectors, and cosmological convention without losing dimensional consistency.

A useful rule of practice is this: first reduce the problem to a linear physical quantity, then check its scale against a known anchor, and only after that convert into the community-preferred reporting unit.

## Fundamental SI, CGS, base, and derived units

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| SI base | metre | m | $$1\,\mathrm{m}$$ | Length; final reference for all distances |
| SI base | kilogram | kg | $$1\,\mathrm{kg}$$ | Mass |
| SI base | second | s | $$1\,\mathrm{s}$$ | Time |
| SI base | kelvin | K | $$1\,\mathrm{K}$$ | Temperature; CMB, plasmas, stellar atmospheres |
| SI base | ampere | A | $$1\,\mathrm{A}$$ | Instrumentation and plasma physics |
| SI derived | radian | rad | dimensionless | Natural angular unit |
| SI derived | steradian | sr | dimensionless | Solid angle |
| SI derived | hertz | Hz | $$1\,\mathrm{Hz}=1\,\mathrm{s^{-1}}$$ | Frequency |
| SI derived | joule | J | $$1\,\mathrm{J}=1\,\mathrm{kg\,m^2\,s^{-2}}$$ | Energy |
| SI derived | watt | W | $$1\,\mathrm{W}=1\,\mathrm{J\,s^{-1}}$$ | Power and luminosity |
| SI derived | newton | N | $$1\,\mathrm{N}=1\,\mathrm{kg\,m\,s^{-2}}$$ | Force; less often used directly in astronomy |
| SI derived | pascal | Pa | $$1\,\mathrm{Pa}=1\,\mathrm{N\,m^{-2}}$$ | Pressure; sometimes used for ISM or ICM gas |
| CGS base | centimetre | cm | $$1\,\mathrm{cm}=10^{-2}\,\mathrm{m}$$ | Legacy astrophysical convention |
| CGS base | gram | g | $$1\,\mathrm{g}=10^{-3}\,\mathrm{kg}$$ | Legacy astrophysical convention |
| CGS derived | erg | erg | $$1\,\mathrm{erg}=10^{-7}\,\mathrm{J}$$ | Common for energies and luminosities |
| CGS derived | dyne | dyn | $$1\,\mathrm{dyn}=10^{-5}\,\mathrm{N}$$ | Common in older stellar-structure texts |
| CGS pressure | barye | Ba | $$1\,\mathrm{Ba}=0.1\,\mathrm{Pa}$$ | Since $$1\,\mathrm{Ba}=1\,\mathrm{dyn\,cm^{-2}}$$ |

SI definitions are set by fixed constants in the SI Brochure. CGS units remain common in older literature, high-energy astrophysics, plasma astrophysics, stellar structure, and radiative-transfer contexts.

## Fundamental conversion anchors

| Quantity | Symbol | Useful value | Status | Why it matters in astronomy |
|---|---:|---:|---|---|
| Speed of light | $$c$$ | $$299{,}792{,}458\,\mathrm{m\,s^{-1}}$$ | exact | Converts time to distance; defines light-travel scales |
| Elementary charge | $$e$$ | $$1.602176634\times10^{-19}\,\mathrm{C}$$ | exact | Makes $$1\,\mathrm{eV}$$ an exact joule conversion |
| Planck constant | $$h$$ | $$6.62607015\times10^{-34}\,\mathrm{J\,s}$$ | exact | Photon energy: $$E=h\nu$$ |
| Boltzmann constant | $$k_B$$ | $$1.380649\times10^{-23}\,\mathrm{J\,K^{-1}}$$ | exact | Connects temperature and particle energy |
| Stefan-Boltzmann constant | $$\sigma$$ | $$5.670374419\ldots\times10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}$$ | exact as a derived value | Stellar luminosity: $$L=4\pi R^2\sigma T^4$$ |
| Newtonian gravitational constant | $$G$$ | $$6.67430\times10^{-11}\,\mathrm{m^3\,kg^{-1}\,s^{-2}}$$ | measured | Use $$GM$$ whenever possible in orbital dynamics |
| Astronomical unit | $$\mathrm{au}$$ | $$149{,}597{,}870{,}700\,\mathrm{m}$$ | exact | Solar-system distance scale |
| Parsec | $$\mathrm{pc}$$ | $$3.08567758149\times10^{16}\,\mathrm{m}$$ | exact through $$\mathrm{au}$$ and angular definitions | Stellar and galactic distance scale |

For gravity, the clean physical quantity in celestial mechanics is often $$GM$$, not $$M$$ alone. Orbits constrain the gravitational parameter $$GM$$ more directly than they constrain $$M$$ and $$G$$ separately.

## SI prefix ladder most often seen in astronomy

| Prefix | Symbol | Factor | Astronomy examples | Mental scale |
|---|---:|---:|---|---|
| nano | n | $$10^{-9}$$ | $$\mathrm{nm}$$ wavelength | Optical wavelengths are hundreds of nm |
| micro | μ | $$10^{-6}$$ | $$\mathrm{\mu m}$$, $$\mathrm{\mu Jy}$$, $$\mathrm{\mu as}$$ | Infrared wavelengths, deep-field fluxes |
| milli | m | $$10^{-3}$$ | $$\mathrm{mJy}$$, $$\mathrm{mas}$$ | Radio and astrometry subunits |
| centi | c | $$10^{-2}$$ | $$\mathrm{cm}$$, $$\mathrm{cm^{-1}}$$ | CGS and spectroscopy legacy |
| kilo | k | $$10^3$$ | $$\mathrm{km\,s^{-1}}$$, $$\mathrm{kpc}$$, $$\mathrm{keV}$$ | Galactic velocities and X-rays |
| mega | M | $$10^6$$ | $$\mathrm{Mpc}$$, $$\mathrm{Myr}$$, $$\mathrm{MeV}$$ | Extragalactic distances and nuclear energies |
| giga | G | $$10^9$$ | $$\mathrm{Gpc}$$, $$\mathrm{Gyr}$$, $$\mathrm{GeV}$$ | Cosmology and particle astrophysics |
| tera | T | $$10^{12}$$ | $$\mathrm{TeV}$$ | Very-high-energy gamma rays |
| peta | P | $$10^{15}$$ | $$\mathrm{PeV}$$ | Cosmic rays and neutrinos |
| exa | E | $$10^{18}$$ | $$\mathrm{EeV}$$ | Ultra-high-energy cosmic rays |

Be careful with capitalization. $$\mathrm{Mpc}$$ means megaparsec, while $$\mathrm{mpc}$$ would mean milliparsec. Likewise, $$\mathrm{Myr}$$ means million years.

## Angles, sky coordinates, and areas on the sky

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| Angle | degree | ° | $$1^\circ=\pi/180\,\mathrm{rad}$$ | Sky maps and field of view |
| Angle | arcminute | arcmin, ′ | $$1′=1/60^\circ$$ | Seeing and field of view |
| Angle | arcsecond | arcsec, ″ | $$1″=\pi/648000\,\mathrm{rad}$$ | Astrometry, PSF FWHM, pixel scale |
| Angle | milliarcsecond | mas | $$1\,\mathrm{mas}=10^{-3}\,\mathrm{arcsec}$$ | Gaia-level astrometry |
| Angle | microarcsecond | μas | $$1\,\mathrm{\mu as}=10^{-6}\,\mathrm{arcsec}$$ | Precision lensing and astrometry |
| RA measure | hour of right ascension | h | $$1\,\mathrm{h_{RA}}=15^\circ$$ | Right ascension is often in h:m:s |
| RA measure | minute of right ascension | m | $$1\,\mathrm{m_{RA}}=15′$$ | Coordinate formatting |
| RA measure | second of right ascension | s | $$1\,\mathrm{s_{RA}}=15″$$ | Coordinate formatting |
| Sky area | square degree | deg² | $$1\,\mathrm{deg^2}=(\pi/180)^2\,\mathrm{sr}$$ | Survey areas |
| Sky area | steradian | sr | SI solid angle | All-sky area is $$4\pi\,\mathrm{sr}\approx41253\,\mathrm{deg^2}$$ |

## Angle conversions and sky-scale intuition

| Quantity | Conversion | Intuition / use |
|---|---:|---|
| $$1\,\mathrm{rad}$$ | $$57.2957795^\circ$$ | Natural unit in formulas |
| $$1^\circ$$ | $$60′=3600″=1.74532925\times10^{-2}\,\mathrm{rad}$$ | Large sky maps and survey footprints |
| $$1′$$ | $$2.90888209\times10^{-4}\,\mathrm{rad}$$ | Seeing fields and small telescope fields of view |
| $$1″$$ | $$4.84813681\times10^{-6}\,\mathrm{rad}$$ | Core astrometric unit |
| $$1\,\mathrm{mas}$$ | $$4.84813681\times10^{-9}\,\mathrm{rad}$$ | Gaia, VLBI, stellar diameters |
| $$1\,\mathrm{\mu as}$$ | $$4.84813681\times10^{-12}\,\mathrm{rad}$$ | Precision astrometry and microlensing |
| $$1\,\mathrm{deg^2}$$ | $$3.04617420\times10^{-4}\,\mathrm{sr}$$ | Survey areas |
| $$1\,\mathrm{sr}$$ | $$3282.80635\,\mathrm{deg^2}$$ | Diffuse-sky and intensity units |
| Full sky | $$4\pi\,\mathrm{sr}=41252.96125\,\mathrm{deg^2}$$ | Useful check for survey coverage |

## Small-angle scaffolding

| Situation | Rule | Example |
|---|---|---|
| General small angle | physical size $$s\approx D\theta$$, with $$\theta$$ in radians | Never insert degrees or arcseconds directly into this formula |
| Parsec definition | at $$1\,\mathrm{pc}$$, $$1\,\mathrm{au}$$ subtends $$1″$$ | This is the geometric meaning of parsec |
| Angular to linear scale | at distance $$D\,\mathrm{pc}$$, $$1″$$ corresponds to $$D\,\mathrm{au}$$ | At $$100\,\mathrm{pc}$$, $$1″\approx100\,\mathrm{au}$$ |
| Milliarcsecond scale | at distance $$D\,\mathrm{kpc}$$, $$1\,\mathrm{mas}$$ corresponds to $$D\,\mathrm{au}$$ | At $$1\,\mathrm{kpc}$$, $$1\,\mathrm{mas}\approx1\,\mathrm{au}$$ |
| Galactic-center scale | at $$8\,\mathrm{kpc}$$, $$1\,\mathrm{mas}\approx8\,\mathrm{au}$$ | Useful for stellar orbits near Sgr A* |
| Extragalactic scale | at $$1\,\mathrm{Mpc}$$, $$1″\approx4.848\,\mathrm{pc}$$ | Nearby galaxies: arcseconds become parsecs |

The most useful mental formula is that $$1″$$ at $$D\,\mathrm{pc}$$ corresponds to $$D\,\mathrm{au}$$. This avoids repeated radian conversions.

## Time

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| Time | minute | min | $$60\,\mathrm{s}$$ | Exposure times |
| Time | hour | h | $$3600\,\mathrm{s}$$ | Observing blocks |
| Time | day | d | $$86400\,\mathrm{s}$$ | Cadence and periods |
| Time | Julian year | a or yr | $$1\,\mathrm{a}=365.25\,\mathrm{d}=31557600\,\mathrm{s}$$ | Useful for light-year conversion |
| Time scale | kiloyear | kyr or ka | $$10^3\,\mathrm{a}$$ | Astro and geo timescales |
| Time scale | megayear | Myr or Ma | $$10^6\,\mathrm{a}$$ | Stellar and galaxy evolution |
| Time scale | gigayear | Gyr or Ga | $$10^9\,\mathrm{a}$$ | Cosmology |

## Time and light-travel scaffolding

| Unit / interval | Distance light travels | Practical intuition |
|---|---:|---|
| $$1\,\mathrm{s}$$ | $$299{,}792.458\,\mathrm{km}$$ | One light-second is roughly Earth-Moon scale |
| $$1\,\mathrm{min}$$ | $$1.79875475\times10^7\,\mathrm{km}$$ | Useful for solar-system timing |
| $$1\,\mathrm{h}$$ | $$1.07925285\times10^9\,\mathrm{km}$$ | Light-hour scale for the outer solar system |
| $$1\,\mathrm{d}$$ | $$2.59020684\times10^{13}\,\mathrm{m}$$ | Light-day used in reverberation mapping |
| $$1\,\mathrm{a}$$ | $$9.46073047258\times10^{15}\,\mathrm{m}=1\,\mathrm{ly}$$ | Julian-year light-travel distance |
| $$1\,\mathrm{au}$$ | $$499.004784\,\mathrm{s}=8.316746\,\mathrm{min}$$ light time | Sun-Earth light-travel time |
| $$1\,\mathrm{pc}$$ | $$3.26156378\,\mathrm{ly}$$ | A parsec is larger than a light-year by factor $$3.26$$ |

## Kinematic scale shortcuts

| Rule | Equivalent value | Why useful |
|---|---:|---|
| $$1\,\mathrm{km\,s^{-1}}$$ for $$1\,\mathrm{Myr}$$ | $$1.0227\,\mathrm{pc}$$ | Stellar motions in clusters |
| $$1\,\mathrm{pc\,Myr^{-1}}$$ | $$0.9778\,\mathrm{km\,s^{-1}}$$ | Converts proper-motion-scale dynamics |
| $$1\,\mathrm{km\,s^{-1}}$$ for $$1\,\mathrm{Gyr}$$ | $$1.0227\,\mathrm{kpc}$$ | Galactic migration intuition |
| $$100\,\mathrm{km\,s^{-1}}$$ for $$1\,\mathrm{Gyr}$$ | $$102.27\,\mathrm{kpc}$$ | Halo and satellite-scale motion |
| $$10\,\mathrm{km\,s^{-1}}$$ for $$10\,\mathrm{Myr}$$ | $$102.27\,\mathrm{pc}$$ | OB associations and local star formation |

One of the best sanity checks in galactic astronomy is $$1\,\mathrm{km\,s^{-1}}\approx1\,\mathrm{pc\,Myr^{-1}}$$.

## Distances

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| Solar system | astronomical unit | au | $$1\,\mathrm{au}=149{,}597{,}870{,}700\,\mathrm{m}$$ exactly | IAU-defined; prefer lowercase $$\mathrm{au}$$ |
| Stellar | parsec | pc | $$1\,\mathrm{pc}=648000\,\mathrm{au}/\pi$$ exactly in the IAU framework | Parallax geometry; standard in papers |
| Stellar / galactic | kiloparsec | kpc | $$10^3\,\mathrm{pc}$$ | Milky Way structure |
| Extragalactic | megaparsec | Mpc | $$10^6\,\mathrm{pc}$$ | Large-scale structure, distances, Hubble law |
| Cosmology | gigaparsec | Gpc | $$10^9\,\mathrm{pc}$$ | Horizon-scale distances |
| Popular | light-year | ly | $$1\,\mathrm{ly}=c\times1\,\mathrm{a}\approx9.4607\times10^{15}\,\mathrm{m}$$ | Teaching; less common in research |
| LSS convention | per-$$h$$ distance | $$h^{-1}\,\mathrm{Mpc}$$ | equals $$\mathrm{Mpc}/h$$ | Makes $$H_0$$ dependence explicit |

## Distance ladder with proportions

| Unit | SI value | In other astronomy units | Intuitive use |
|---|---:|---:|---|
| $$1\,\mathrm{au}$$ | $$1.495978707\times10^{11}\,\mathrm{m}$$ | $$4.84813681\times10^{-6}\,\mathrm{pc}$$ | Solar-system baseline |
| $$1\,\mathrm{ly}$$ | $$9.46073047258\times10^{15}\,\mathrm{m}$$ | $$63241.077\,\mathrm{au}=0.306601\,\mathrm{pc}$$ | Public-facing stellar distance |
| $$1\,\mathrm{pc}$$ | $$3.08567758149\times10^{16}\,\mathrm{m}$$ | $$206264.806\,\mathrm{au}=3.261564\,\mathrm{ly}$$ | Stellar distance unit |
| $$1\,\mathrm{kpc}$$ | $$3.08567758149\times10^{19}\,\mathrm{m}$$ | $$3261.564\,\mathrm{ly}$$ | Milky Way structure |
| $$1\,\mathrm{Mpc}$$ | $$3.08567758149\times10^{22}\,\mathrm{m}$$ | $$3.261564\times10^6\,\mathrm{ly}$$ | Galaxies and the local universe |
| $$1\,\mathrm{Gpc}$$ | $$3.08567758149\times10^{25}\,\mathrm{m}$$ | $$3.261564\times10^9\,\mathrm{ly}$$ | Cosmological distances |

## Distance modulus quick table

| Distance | Distance modulus $$\mu=m-M$$ | Typical use |
|---:|---:|---|
| $$10\,\mathrm{pc}$$ | $$0$$ | Absolute magnitude reference distance |
| $$100\,\mathrm{pc}$$ | $$5$$ | Nearby stars |
| $$1\,\mathrm{kpc}$$ | $$10$$ | Galactic objects |
| $$10\,\mathrm{kpc}$$ | $$15$$ | Milky Way scale |
| $$100\,\mathrm{kpc}$$ | $$20$$ | Milky Way satellites |
| $$1\,\mathrm{Mpc}$$ | $$25$$ | Nearby galaxies |
| $$10\,\mathrm{Mpc}$$ | $$30$$ | Local-volume galaxies |
| $$100\,\mathrm{Mpc}$$ | $$35$$ | Low-redshift extragalactic astronomy |
| $$1\,\mathrm{Gpc}$$ | $$40$$ | Cosmology-scale sources |

Because $$\mu=5\log_{10}(d/10\,\mathrm{pc})$$, multiplying distance by $$10$$ adds $$5$$ magnitudes.

## Mass, gravity, and nominal solar and planetary units

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| Mass, physical | measured solar mass | $$M_\odot$$ | approximately $$1.988\times10^{30}\,\mathrm{kg}$$ | The measured value can update with best estimates |
| Nominal, exact | nominal solar radius | $$R_\odot^{\mathrm{N}}$$ | $$6.957\times10^8\,\mathrm{m}$$ exactly | Use as a conversion constant |
| Nominal, exact | nominal solar luminosity | $$L_\odot^{\mathrm{N}}$$ | $$3.828\times10^{26}\,\mathrm{W}$$ exactly | Standard luminosity unit |
| Nominal, exact | nominal solar effective temperature | $$T_{\mathrm{eff}\odot}^{\mathrm{N}}$$ | $$5772\,\mathrm{K}$$ exactly | Stellar scaling |
| Nominal, exact | nominal solar mass parameter | $$(GM)_\odot^{\mathrm{N}}$$ | $$1.3271244\times10^{20}\,\mathrm{m^3\,s^{-2}}$$ exactly | Orbital dynamics prefers $$GM$$ |
| Nominal, exact | nominal Earth mass parameter | $$(GM)_\oplus^{\mathrm{N}}$$ | $$3.986004\times10^{14}\,\mathrm{m^3\,s^{-2}}$$ exactly | Exoplanets and orbits |
| Nominal, exact | nominal Jupiter mass parameter | $$(GM)_J^{\mathrm{N}}$$ | $$1.2668653\times10^{17}\,\mathrm{m^3\,s^{-2}}$$ exactly | Exoplanets and radial-velocity masses |

IAU nominal quantities are exact by definition. They are conversion factors, not latest measured values.

## Solar, Earth, and Jupiter unit proportions

| Quantity | Symbol | Value | Useful proportion |
|---|---:|---:|---|
| Nominal solar radius | $$R_\odot^{\mathrm{N}}$$ | $$6.957\times10^8\,\mathrm{m}$$ | $$695{,}700\,\mathrm{km}$$ |
| Nominal solar luminosity | $$L_\odot^{\mathrm{N}}$$ | $$3.828\times10^{26}\,\mathrm{W}$$ | $$3.828\times10^{33}\,\mathrm{erg\,s^{-1}}$$ |
| Nominal solar effective temperature | $$T_{\mathrm{eff}\odot}^{\mathrm{N}}$$ | $$5772\,\mathrm{K}$$ | Solar blackbody scaling anchor |
| Nominal solar irradiance at $$1\,\mathrm{au}$$ | $$S_\odot^{\mathrm{N}}$$ | $$1361\,\mathrm{W\,m^{-2}}$$ | Solar constant convention |
| Nominal solar mass parameter | $$(GM)_\odot^{\mathrm{N}}$$ | $$1.3271244\times10^{20}\,\mathrm{m^3\,s^{-2}}$$ | Preferred for orbits |
| Nominal Earth mass parameter | $$(GM)_\oplus^{\mathrm{N}}$$ | $$3.986004\times10^{14}\,\mathrm{m^3\,s^{-2}}$$ | Geocentric dynamics |
| Nominal Jupiter mass parameter | $$(GM)_J^{\mathrm{N}}$$ | $$1.2668653\times10^{17}\,\mathrm{m^3\,s^{-2}}$$ | Exoplanet and radial-velocity work |
| Nominal Earth equatorial radius | $$R_{\mathrm{e}\oplus}^{\mathrm{N}}$$ | $$6378.1\,\mathrm{km}$$ | Planet-radius comparison |
| Nominal Earth polar radius | $$R_{\mathrm{p}\oplus}^{\mathrm{N}}$$ | $$6356.8\,\mathrm{km}$$ | Oblateness reference |
| Nominal Jupiter equatorial radius | $$R_{\mathrm{e}J}^{\mathrm{N}}$$ | $$71492\,\mathrm{km}$$ | Default nominal Jupiter radius |
| Nominal Jupiter polar radius | $$R_{\mathrm{p}J}^{\mathrm{N}}$$ | $$66854\,\mathrm{km}$$ | Oblateness reference |

## Approximate mass and radius ratios for intuition

| Ratio | Approximate value | Use |
|---|---:|---|
| $$M_\odot/M_\oplus$$ | $$333000$$ | Solar versus terrestrial mass scale |
| $$M_\odot/M_J$$ | $$1047.35$$ | Star-giant-planet comparison |
| $$M_J/M_\oplus$$ | $$317.8$$ | Exoplanet mass comparison |
| $$R_\odot/R_\oplus$$ | $$109.1$$ | Transit-depth intuition |
| $$R_J/R_\oplus$$ | $$11.2$$ | Hot Jupiter versus rocky planet scale |
| $$R_\odot/R_J$$ | $$9.73$$ | Stellar versus giant-planet radii |
| Solar mean density | about $$1.41\,\mathrm{g\,cm^{-3}}$$ | Surprisingly close to water-scale density |
| Earth mean density | about $$5.51\,\mathrm{g\,cm^{-3}}$$ | Rock and metal planet scale |
| Jupiter mean density | about $$1.33\,\mathrm{g\,cm^{-3}}$$ | Gas-giant scale |

These ratios are for intuition. For precision work, specify whether values are measured, nominal, equatorial, polar, or model-derived.

## Energy, particle units, and spectroscopy essentials

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| Energy | electron-volt | eV | $$1\,\mathrm{eV}=1.602176634\times10^{-19}\,\mathrm{J}$$ | X-ray, gamma-ray astronomy, atomic lines |
| Energy | keV, MeV, GeV, TeV | keV etc. | $$10^3,10^6,10^9,10^{12}\,\mathrm{eV}$$ | High-energy bands |
| Wavelength | angstrom | Å | $$1\,\unicode{x212B}=10^{-10}\,\mathrm{m}$$ | Optical and UV spectra |
| Wavelength | nanometre | nm | $$10^{-9}\,\mathrm{m}$$ | Optical and UV |
| Wavelength | micrometre | μm | $$10^{-6}\,\mathrm{m}$$ | Infrared |
| Wavenumber | inverse centimetre | cm⁻¹ | $$1\,\mathrm{cm^{-1}}=100\,\mathrm{m^{-1}}$$ | Molecular and IR spectroscopy |
| Spectral resolution | resolving power | $$R$$ | $$R=\lambda/\Delta\lambda$$, dimensionless | Instrument performance spec |
| Line strength | equivalent width | EW | usually Å or nm | $$\mathrm{EW}=\int(1-F_\lambda/F_{\lambda,c})\,d\lambda$$ |
| Velocity | kilometre per second | km/s | $$1\,\mathrm{km\,s^{-1}}=10^3\,\mathrm{m\,s^{-1}}$$ | Radial velocities, dispersions, outflows |
| Redshift | redshift | $$z$$ | dimensionless | For small $$z$$, $$v\approx cz$$; not valid at high $$z$$ |

## Energy, temperature, frequency, and wavelength bridge

The exact electron-volt conversion follows from the fixed elementary charge. The useful bridge is $$E=h\nu=hc/\lambda=k_BT$$, depending on whether the problem is framed spectroscopically, thermally, or radiometrically.

| Quantity | Conversion | Practical use |
|---|---:|---|
| $$1\,\mathrm{eV}$$ | $$1.602176634\times10^{-19}\,\mathrm{J}$$ | Atomic and high-energy astronomy |
| $$1\,\mathrm{J}$$ | $$6.241509074\times10^{18}\,\mathrm{eV}$$ | Converts macroscopic energy to particle units |
| $$1\,\mathrm{erg}$$ | $$10^{-7}\,\mathrm{J}=6.241509074\times10^{11}\,\mathrm{eV}$$ | CGS energy unit |
| $$1\,\mathrm{eV}$$ as temperature | $$11604.518\,\mathrm{K}$$ | Plasma and X-ray gas intuition |
| $$1\,\mathrm{keV}$$ as temperature | $$1.1604518\times10^7\,\mathrm{K}$$ | Galaxy clusters, coronae, supernova remnants |
| $$1\,\mathrm{eV}$$ as frequency | $$2.417989242\times10^{14}\,\mathrm{Hz}$$ | Optical and near-IR photon scale |
| $$1\,\mathrm{eV}$$ as wavelength | $$1.239841984\,\mathrm{\mu m}$$ | Near-IR photon |
| $$1\,\mathrm{keV}$$ as wavelength | $$12.39841984\,\unicode{x212B}$$ | Soft X-ray spectroscopy |

## Spectroscopy shortcut formulas

| Formula | Convenient form | Use |
|---|---:|---|
| Photon energy from wavelength | $$E[\mathrm{eV}]=1.239841984/\lambda[\mathrm{\mu m}]$$ | Optical and IR |
| Photon energy from wavelength | $$E[\mathrm{eV}]=1239.841984/\lambda[\mathrm{nm}]$$ | Optical and UV |
| X-ray energy from wavelength | $$E[\mathrm{keV}]=12.39841984/\lambda[\unicode{x212B}]$$ | X-ray lines |
| Wavelength from X-ray energy | $$\lambda[\unicode{x212B}]=12.39841984/E[\mathrm{keV}]$$ | X-ray instruments |
| Frequency from wavelength | $$\nu[\mathrm{Hz}]=c/\lambda[\mathrm{m}]$$ | General spectroscopy |
| Velocity width from wavelength width | $$\Delta v/c\approx\Delta\lambda/\lambda$$ | Doppler broadening |
| Resolving power | $$R=\lambda/\Delta\lambda\approx c/\Delta v$$ | Instrument comparison |

## Wavenumber conversion scaffold

| Unit | Conversion | Practical meaning |
|---|---:|---|
| $$1\,\mathrm{cm^{-1}}$$ | $$100\,\mathrm{m^{-1}}$$ | Spectroscopy convention |
| $$1\,\mathrm{cm^{-1}}$$ as frequency | $$29.9792458\,\mathrm{GHz}$$ | Molecular and IR spectroscopy |
| $$1\,\mathrm{cm^{-1}}$$ as energy | $$1.239841984\times10^{-4}\,\mathrm{eV}$$ | Molecular transitions |
| $$1\,\mathrm{cm^{-1}}$$ as temperature | $$1.438776878\,\mathrm{K}$$ | Rotational and vibrational excitation |
| $$1000\,\mathrm{cm^{-1}}$$ | $$0.123984\,\mathrm{eV}$$ | Mid-IR vibrational scale |
| $$10^4\,\mathrm{cm^{-1}}$$ | $$1.23984\,\mathrm{eV}$$ | Near-IR or optical boundary scale |

## Radiometry and photometry

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| Flux | irradiance or flux | $$F$$ | $$\mathrm{W\,m^{-2}}$$ | Broadband energy flux at detector |
| Flux, CGS | flux |  | $$1\,\mathrm{erg\,s^{-1}\,cm^{-2}}=10^{-3}\,\mathrm{W\,m^{-2}}$$ | Still common in high-energy astronomy |
| Spectral flux density | per frequency | $$f_\nu$$ | $$\mathrm{W\,m^{-2}\,Hz^{-1}}$$ | Radio and SEDs; connects to AB magnitudes |
| Spectral flux density, CGS | per frequency | $$f_\nu$$ | $$\mathrm{erg\,s^{-1}\,cm^{-2}\,Hz^{-1}}$$ | AB definition often written in CGS |
| Spectral flux density | per wavelength | $$f_\lambda$$ | $$\mathrm{W\,m^{-2}\,m^{-1}}$$, often per μm or Å | Spectrophotometry |
| Specific intensity | per frequency per steradian | $$I_\nu$$ | $$\mathrm{W\,m^{-2}\,Hz^{-1}\,sr^{-1}}$$ | Surface brightness in physical units |
| Radiance, photon | photon radiance |  | $$\mathrm{photons\,s^{-1}\,m^{-2}\,sr^{-1}}$$, optionally per Å or μm | Airglow, aurora, IFU work |
| Luminosity | power output | $$L$$ | $$\mathrm{W}$$ or $$\mathrm{erg\,s^{-1}}$$ | Intrinsic source power |
| Emissivity | volume emissivity | $$j_\nu$$ | $$\mathrm{W\,m^{-3}\,Hz^{-1}\,sr^{-1}}$$ | Radiative transfer |
| Absorption | opacity | $$\kappa$$ | $$\mathrm{m^2\,kg^{-1}}$$ or $$\mathrm{cm^2\,g^{-1}}$$ | Dust and ISM models |

## Radiometry and photometry conversion anchors

| Quantity | Conversion / relation | Practical intuition |
|---|---:|---|
| CGS flux to SI flux | $$1\,\mathrm{erg\,s^{-1}\,cm^{-2}}=10^{-3}\,\mathrm{W\,m^{-2}}$$ | High-energy astronomy often uses CGS; instrument physics often uses SI |
| SI flux to CGS flux | $$1\,\mathrm{W\,m^{-2}}=10^3\,\mathrm{erg\,s^{-1}\,cm^{-2}}$$ | X-ray and gamma-ray literature often needs this reverse conversion |
| CGS luminosity to SI luminosity | $$1\,\mathrm{erg\,s^{-1}}=10^{-7}\,\mathrm{W}$$ | Stars, AGN, and explosive transients |
| SI luminosity to CGS luminosity | $$1\,\mathrm{W}=10^7\,\mathrm{erg\,s^{-1}}$$ | $$L_\odot^{\mathrm{N}}=3.828\times10^{26}\,\mathrm{W}=3.828\times10^{33}\,\mathrm{erg\,s^{-1}}$$ |
| Jansky to SI | $$1\,\mathrm{Jy}=10^{-26}\,\mathrm{W\,m^{-2}\,Hz^{-1}}$$ | Radio, millimetre, and submillimetre default unit |
| Jansky to CGS | $$1\,\mathrm{Jy}=10^{-23}\,\mathrm{erg\,s^{-1}\,cm^{-2}\,Hz^{-1}}$$ | AB magnitudes and traditional SEDs |
| MJy/sr to SI | $$1\,\mathrm{MJy\,sr^{-1}}=10^{-20}\,\mathrm{W\,m^{-2}\,Hz^{-1}\,sr^{-1}}$$ | IR sky maps and diffuse emission |
| SFU to Jy | $$1\,\mathrm{SFU}=10^4\,\mathrm{Jy}$$ | Solar radio bursts |
| SFU to SI | $$1\,\mathrm{SFU}=10^{-22}\,\mathrm{W\,m^{-2}\,Hz^{-1}}$$ | Solar-physics radio unit |

The basic bridge between luminosity and observed flux is $$F=L/(4\pi d_L^2)$$. In nearby non-cosmological problems, $$d_L$$ can often be approximated by ordinary distance. In cosmology, the luminosity distance must be used.

## Flux-luminosity distance sanity checks

| Source luminosity | Distance | Observed bolometric flux | Intuition |
|---:|---:|---:|---|
| $$1\,L_\odot$$ | $$1\,\mathrm{au}$$ | $$1361\,\mathrm{W\,m^{-2}}$$ | Solar constant scale |
| $$1\,L_\odot$$ | $$1\,\mathrm{pc}$$ | $$3.20\times10^{-8}\,\mathrm{W\,m^{-2}}$$ | The Sun at $$1\,\mathrm{pc}$$ is still very bright |
| $$1\,L_\odot$$ | $$10\,\mathrm{pc}$$ | $$3.20\times10^{-10}\,\mathrm{W\,m^{-2}}$$ | Absolute-magnitude reference distance |
| $$1\,L_\odot$$ | $$1\,\mathrm{kpc}$$ | $$3.20\times10^{-14}\,\mathrm{W\,m^{-2}}$$ | Galactic stellar photometry scale |
| $$1\,L_\odot$$ | $$1\,\mathrm{Mpc}$$ | $$3.20\times10^{-20}\,\mathrm{W\,m^{-2}}$$ | A solar-type star is not individually observable at galaxy distances |
| $$10^{10}\,L_\odot$$ | $$10\,\mathrm{Mpc}$$ | $$3.20\times10^{-12}\,\mathrm{W\,m^{-2}}$$ | Ordinary galaxy total-luminosity scale |
| $$10^{12}\,L_\odot$$ | $$1\,\mathrm{Gpc}$$ | $$3.20\times10^{-16}\,\mathrm{W\,m^{-2}}$$ | Bright infrared galaxies and quasars |

If a result differs from these scales by many orders of magnitude, the likely failure points are distance units, the square in the inverse-square law, $$\mathrm{cm^2}$$ to $$\mathrm{m^2}$$ conversion, or the conversion from $$L_\odot$$ to watts.

## Frequency flux density and wavelength flux density

| Relation | Convenient form | Use |
|---|---:|---|
| Basic relation | $$f_\nu\,d\nu=f_\lambda\,d\lambda$$ | Same energy flow expressed using different spectral coordinates |
| Conversion | $$f_\nu=f_\lambda\lambda^2/c$$ | From wavelength density to frequency density |
| Conversion | $$f_\lambda=f_\nu c/\lambda^2$$ | From frequency density to wavelength density |
| Per-angstrom warning | $$1\,\unicode{x212B}=10^{-8}\,\mathrm{cm}$$ | A common source of CGS spectroscopy errors |
| Jy and CGS wavelength flux | $$f_\nu[\mathrm{Jy}]\approx3.33564\times10^4\lambda[\unicode{x212B}]^2 f_\lambda[\mathrm{erg\,s^{-1}\,cm^{-2}\,\unicode{x212B}^{-1}}]$$ | Quick optical SED check |
| AB zero point | $$m_{\mathrm{AB}}=0$$ corresponds to approximately $$3631\,\mathrm{Jy}$$ | Core AB-system anchor |

A flat $$f_\nu$$ spectrum is not flat in $$f_\lambda$$. Because $$f_\lambda=f_\nu c/\lambda^2$$, a spectrum flat in $$f_\nu$$ varies as $$\lambda^{-2}$$ in $$f_\lambda$$.

## Radio and IR community standards

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| Radio flux density | jansky | Jy | $$1\,\mathrm{Jy}=10^{-26}\,\mathrm{W\,m^{-2}\,Hz^{-1}}$$ | Default radio continuum unit |
| Flux density | millijansky and microjansky | mJy, μJy | $$10^{-3}\,\mathrm{Jy}$$ and $$10^{-6}\,\mathrm{Jy}$$ | Deep fields |
| Surface brightness | megajansky per steradian | MJy/sr | $$10^6\,\mathrm{Jy\,sr^{-1}}$$ | IR sky maps and diffuse emission |
| Solar radio | solar flux unit | SFU | $$1\,\mathrm{SFU}=10^4\,\mathrm{Jy}=10^{-22}\,\mathrm{W\,m^{-2}\,Hz^{-1}}$$ | Solar radio bursts |

## Magnitudes and common photometric systems

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| Log brightness | magnitude | mag | logarithmic | $$m_1-m_2=-2.5\log_{10}(F_1/F_2)$$ |
| System | AB magnitude | $$m_{\mathrm{AB}}$$ | $$m_{\mathrm{AB}}=-2.5\log_{10}(f_\nu/3631\,\mathrm{Jy})$$ | Most survey photometry |
| System | Vega magnitude |  | defined relative to the Vega SED | Filter-dependent zero points; still common in IR |
| System | ST magnitude | $$m_{\mathrm{ST}}$$ | defined for constant $$f_\lambda$$ zero point | Often in HST contexts |
| Distance indicator | distance modulus | $$\mu$$ | $$\mu=m-M=5\log_{10}(d/10\,\mathrm{pc})$$ | Photometric distances |
| Surface brightness | mag per arcsec² | mag/arcsec² | logarithmic per solid angle | Must specify band and system |
| Bolometric magnitudes, IAU | zero-point luminosity | $$L_0$$ | $$L_0=3.0128\times10^{28}\,\mathrm{W}$$ | For $$M_{\mathrm{bol}}=0$$ |
| Bolometric magnitudes, IAU | zero-point irradiance | $$f_0$$ | $$f_0=2.518021002\times10^{-8}\,\mathrm{W\,m^{-2}}$$ | For $$m_{\mathrm{bol}}=0$$ |

## Magnitude ratio ladder

| Magnitude difference | Flux ratio | Meaning |
|---:|---:|---|
| $$0\,\mathrm{mag}$$ | $$1$$ | Same brightness |
| $$1\,\mathrm{mag}$$ | $$2.512$$ | The brighter object has $$2.512$$ times the flux |
| $$2\,\mathrm{mag}$$ | $$6.310$$ | Common photometric difference |
| $$2.5\,\mathrm{mag}$$ | $$10$$ | Brighter by $$2.5$$ magnitudes means ten times the flux |
| $$5\,\mathrm{mag}$$ | $$100$$ | A distance factor of $$10$$ gives a distance modulus shift of $$5$$ |
| $$10\,\mathrm{mag}$$ | $$10^4$$ | Large survey-depth difference |
| $$15\,\mathrm{mag}$$ | $$10^6$$ | Naked-eye to deep-survey scale |
| $$20\,\mathrm{mag}$$ | $$10^8$$ | Extreme dynamic range |

Magnitude difference follows $$m_1-m_2=-2.5\log_{10}(F_1/F_2)$$, so $$\Delta m=5$$ corresponds to a flux ratio of $$100$$.

## AB magnitude flux-density quick table

| $$m_{\mathrm{AB}}$$ | $$f_\nu$$ in Jy | $$f_\nu$$ in μJy | Typical regime |
|---:|---:|---:|---|
| $$0$$ | $$3631$$ | $$3.631\times10^9$$ | AB zero point |
| $$5$$ | $$36.31$$ | $$3.631\times10^7$$ | Very bright astronomical source |
| $$10$$ | $$0.3631$$ | $$3.631\times10^5$$ | Small-telescope bright objects |
| $$15$$ | $$3.631\times10^{-3}$$ | $$3631$$ | Bright survey sources |
| $$20$$ | $$3.631\times10^{-5}$$ | $$36.31$$ | Ordinary deep imaging |
| $$23$$ | $$2.291\times10^{-6}$$ | $$2.291$$ | Deep optical and near-IR surveys |
| $$25$$ | $$3.631\times10^{-7}$$ | $$0.3631$$ | Very deep imaging |
| $$28$$ | $$2.291\times10^{-8}$$ | $$0.02291$$ | HST or JWST-depth point sources |
| $$30$$ | $$3.631\times10^{-9}$$ | $$0.003631$$ | Extremely faint source regime |

A compact mental shortcut is $$m_{\mathrm{AB}}=23.9$$ corresponds almost exactly to $$1\,\mathrm{\mu Jy}$$. Therefore $$m_{\mathrm{AB}}=28.9$$ corresponds to $$0.01\,\mathrm{\mu Jy}$$, and $$m_{\mathrm{AB}}=18.9$$ corresponds to $$100\,\mathrm{\mu Jy}$$.

## SDSS maggy and nanomaggy scaffold

| Unit | Definition / conversion | Practical use |
|---|---:|---|
| maggy | Flux relative to a zero-magnitude source | Linear flux unit used in SDSS-style pipelines |
| nanomaggy | $$1\,\mathrm{nMgy}=10^{-9}\,\mathrm{maggy}$$ | Convenient for catalog fluxes |
| Approximate Jy value | $$1\,\mathrm{nMgy}\approx3.631\times10^{-6}\,\mathrm{Jy}$$ | Directly tied to the AB-like $$3631\,\mathrm{Jy}$$ zero point |
| AB magnitude from nMgy | $$m\approx22.5-2.5\log_{10}(f_{\mathrm{nMgy}})$$ | Common SDSS catalog conversion |
| nMgy from AB magnitude | $$f_{\mathrm{nMgy}}\approx10^{(22.5-m)/2.5}$$ | Converts catalog magnitudes to linear flux |

For example, $$1\,\mathrm{nMgy}$$ corresponds to $$m\approx22.5$$. A source with $$100\,\mathrm{nMgy}$$ has $$m\approx17.5$$, because increasing flux by $$100$$ decreases magnitude by $$5$$.

## Surface brightness and solid-angle conversion

| Quantity | Conversion / relation | Practical note |
|---|---:|---|
| Arcsecond squared to steradian | $$1\,\mathrm{arcsec^2}=2.35044305\times10^{-11}\,\mathrm{sr}$$ | Needed when converting $$\mathrm{mag\,arcsec^{-2}}$$ to physical intensity |
| Steradian to arcsecond squared | $$1\,\mathrm{sr}=4.25451703\times10^{10}\,\mathrm{arcsec^2}$$ | Diffuse backgrounds and map units |
| MJy/sr to Jy/arcsec² | $$1\,\mathrm{MJy\,sr^{-1}}=2.35044\times10^{-5}\,\mathrm{Jy\,arcsec^{-2}}$$ | IR maps to imaging surface brightness |
| Jy/arcsec² to MJy/sr | $$1\,\mathrm{Jy\,arcsec^{-2}}=4.25452\times10^4\,\mathrm{MJy\,sr^{-1}}$$ | Very bright compact or diffuse comparisons |
| AB mag/arcsec² to Jy/arcsec² | $$f_\nu=3631\times10^{-0.4\mu_{\mathrm{AB}}}\,\mathrm{Jy\,arcsec^{-2}}$$ | Surface brightness in AB system |
| Jy/arcsec² to AB mag/arcsec² | $$\mu_{\mathrm{AB}}=-2.5\log_{10}(f_\nu/3631\,\mathrm{Jy\,arcsec^{-2}})$$ | Imaging papers |

## Common sky brightness anchors

| Band / condition | Approximate surface brightness | Interpretation |
|---|---:|---|
| Dark optical sky, V band | about $$21.5\text{--}22\,\mathrm{mag\,arcsec^{-2}}$$ | Good ground-based optical observing |
| Bright urban sky | less than about $$18\,\mathrm{mag\,arcsec^{-2}}$$ | Severe light pollution |
| Near-IR sky from ground | much brighter than optical | Thermal and airglow background dominate |
| Space optical background | usually darker and more stable | A major reason space telescopes help |
| Galaxy outskirts | greater than about $$25\,\mathrm{mag\,arcsec^{-2}}$$ | Low-surface-brightness regime |
| Ultra-diffuse or tidal features | greater than about $$28\,\mathrm{mag\,arcsec^{-2}}$$ | Demanding flat-field and sky subtraction |

Surface brightness is not the same as total magnitude. A galaxy can have a bright total magnitude but low surface brightness if its light is spread over a large angular area.

## Atmosphere and observing conditions

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| Geometry | airmass | $$X$$ | dimensionless, approximately $$X\approx\sec z$$ | Used in extinction correction; more accurate formulas are needed at large zenith angle |
| Extinction | magnitude per airmass | mag/airmass | logarithmic | Instrument and site dependent; measured from standards |
| Seeing | PSF FWHM | arcsec | angle unit | Often reported as FWHM in arcsec or pixels |

## Detector and pipeline units

These units are ubiquitous in data reduction but are instrument-defined. Conversions require calibration metadata such as gain, quantum efficiency, exposure time, flat-field response, and zeropoint.

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| CCD/CMOS | electron count | $$e^-$$ | physical charge: $$1\,e^-\Rightarrow1.602176634\times10^{-19}\,\mathrm{C}$$ | Fundamental charge carrier for photon detection |
| CCD/CMOS | photon | photon | energy $$E=h\nu$$ | Connects radiometry to counting statistics |
| Imaging | digital number / ADU | DN, ADU | dimensionless, digitized | Raw images; need gain to convert to $$e^-$$ |
| Imaging | count, generic | count | dimensionless | Often used interchangeably with DN or ADU; clarify definition |
| Calibration | gain | $$g$$ | $$g=e^-/\mathrm{ADU}$$ | Converts digitized signal to electrons |
| Noise | read noise | RN | usually $$e^-$$ or ADU | Per read; important in short exposures |
| Noise | dark current |  | $$e^-\,\mathrm{pix^{-1}\,s^{-1}}$$ | Thermal electrons; scales with temperature |
| Detector | full well capacity |  | $$e^-\,\mathrm{pix^{-1}}$$ | Saturation threshold in electrons |
| Detector | bias level |  | ADU | Additive offset removed in calibration |
| Detector | flat-field |  | dimensionless | Pixel response correction |
| Detector | quantum efficiency | QE | dimensionless, $$0$$ to $$1$$ | Fraction of photons producing electrons |
| Sampling | pixel | pix | dimensionless | Indexing; must state pixel scale |
| Plate scale | angular per pixel | arcsec/pix | angle per pixel | Converts detector coordinates to sky angles |
| Spectroscopy | dispersion | Å/pix or nm/pix | wavelength per pixel | Wavelength solution product |
| Spectroscopy | line-spread FWHM | pix or Å | instrument-dependent | Spectral PSF; relates to resolution |
| Photometry | instrumental magnitude | $$m_{\mathrm{inst}}$$ | $$m_{\mathrm{inst}}=-2.5\log_{10}(\mathrm{counts}/t_{\mathrm{exp}})+\mathrm{const}$$ | Converted to calibrated magnitudes via zeropoint, extinction, and color term |
| Zeropoint | photometric zeropoint | ZP | mag | Magnitude corresponding to $$1$$ count/s under a convention |
| Exposure | exposure time | $$t_{\mathrm{exp}}$$ | s | Needed for converting counts to count rate |
| SNR | signal-to-noise ratio | SNR | dimensionless | Often per pixel, per resolution element, or per aperture |
| SDSS linear flux | nanomaggy | nMgy | approximately $$3.631\times10^{-6}\,\mathrm{Jy}$$ | Linear flux unit in SDSS products |

## Detector count and photon-counting scaffold

| Quantity | Relation | Practical use |
|---|---:|---|
| Photon energy | $$E_\gamma=hc/\lambda$$ | Converts flux to photon rate |
| Photon rate from energy flux | $$N_\gamma\approx F A\Delta t/E_\gamma$$ | First-order exposure estimate |
| Electrons from photons | $$N_{e^-}\approx N_\gamma\times\mathrm{QE}$$ | Detector response |
| ADU from electrons | $$\mathrm{ADU}=N_{e^-}/g$$ if $$g=e^-/\mathrm{ADU}$$ | Raw image interpretation |
| Electrons from ADU | $$N_{e^-}=g\times\mathrm{ADU}$$ | Noise model should usually be in electrons |
| Count rate | $$\mathrm{count\,rate}=\mathrm{counts}/t_{\mathrm{exp}}$$ | Photometric calibration |
| Instrumental magnitude | $$m_{\mathrm{inst}}=-2.5\log_{10}(\mathrm{counts}/t_{\mathrm{exp}})+\mathrm{const}$$ | Before zeropoint calibration |

Poisson noise is naturally computed in electrons or photons, not in arbitrary ADU unless gain has already been applied.

## Detector noise formula scaffold

| Case | Approximate expression | Meaning |
|---|---:|---|
| Source Poisson noise | $$\sigma_S\approx\sqrt{S}$$ | $$S$$ in electrons |
| Background Poisson noise | $$\sigma_B\approx\sqrt{n_{\mathrm{pix}}B}$$ | $$B$$ is background electrons per pixel |
| Dark-current noise | $$\sigma_D\approx\sqrt{n_{\mathrm{pix}}Dt}$$ | $$D$$ in $$e^-\,\mathrm{pix^{-1}\,s^{-1}}$$ |
| Read-noise contribution | $$\sigma_{\mathrm{RN}}\approx\sqrt{n_{\mathrm{pix}}}\,\mathrm{RN}$$ | RN in electrons per pixel |
| Basic aperture SNR | $$\mathrm{SNR}\approx S/\sqrt{S+n_{\mathrm{pix}}(B+Dt+\mathrm{RN}^2)}$$ | Common imaging estimate |
| Background-limited regime | $$\mathrm{SNR}\approx S/\sqrt{n_{\mathrm{pix}}B}$$ | Long exposures, sky dominated |
| Source-limited regime | $$\mathrm{SNR}\approx\sqrt{S}$$ | Bright source |
| Read-noise-limited regime | $$\mathrm{SNR}\approx S/(\sqrt{n_{\mathrm{pix}}}\mathrm{RN})$$ | Short exposures and faint backgrounds |

The statement that noise is the square root of ADU is usually imprecise. The square-root rule applies directly when the counts have been correctly converted to electrons or photons and the dominant noise source is Poisson noise.

## Detector dynamic range and saturation scaffold

| Quantity | Relation / example | Practical meaning |
|---|---:|---|
| Full well | for example $$10^4\text{--}10^5\,e^-\,\mathrm{pix^{-1}}$$ | Pixel charge capacity before saturation or nonlinearity |
| Gain | for example $$1\text{--}3\,e^-/\mathrm{ADU}$$ | Depends on camera mode |
| Saturation ADU | $$\mathrm{ADU}_{\mathrm{sat}}\approx\mathrm{full\,well}/g$$ | Converts physical saturation to image values |
| Bias level | instrument-defined ADU offset | Must be removed before interpreting counts |
| Flat field | relative multiplicative correction | Corrects pixel-to-pixel response |
| Linearity range | instrument-defined | Precision photometry avoids saturated or nonlinear pixels |

## Spectroscopy detector scaffold

| Quantity | Relation | Practical meaning |
|---|---:|---|
| Dispersion | for example $$\unicode{x212B}/\mathrm{pix}$$ or $$\mathrm{nm}/\mathrm{pix}$$ | Wavelength change per detector pixel |
| Spectral FWHM | measured in pixels or wavelength | Width of unresolved line |
| Resolving power | $$R=\lambda/\Delta\lambda$$ | Instrument resolution |
| Velocity resolution | $$\Delta v\approx c/R$$ | Converts resolving power to velocity |
| Pixels per resolution element | usually about $$2\text{--}3\,\mathrm{pix}$$ | Sampling condition |
| Equivalent width | $$\mathrm{EW}=\int(1-F_\lambda/F_{\lambda,c})\,d\lambda$$ | Absorption positive under this convention |
| Emission-line flux | $$F_{\mathrm{line}}=\int(F_\lambda-F_{\lambda,c})\,d\lambda$$ | Integrated energy flux |

## Resolving power intuition

| Resolving power $$R$$ | Velocity resolution $$\Delta v\approx c/R$$ | Typical use |
|---:|---:|---|
| $$100$$ | $$3000\,\mathrm{km\,s^{-1}}$$ | Very low-resolution spectra or photometric-like spectra |
| $$1000$$ | $$300\,\mathrm{km\,s^{-1}}$$ | Redshift identification and broad lines |
| $$3000$$ | $$100\,\mathrm{km\,s^{-1}}$$ | Galaxy kinematics and medium resolution |
| $$10000$$ | $$30\,\mathrm{km\,s^{-1}}$$ | Stellar spectroscopy and ISM lines |
| $$50000$$ | $$6\,\mathrm{km\,s^{-1}}$$ | High-resolution stellar abundance work |
| $$100000$$ | $$3\,\mathrm{km\,s^{-1}}$$ | Precision spectroscopy |
| $$300000$$ | $$1\,\mathrm{km\,s^{-1}}$$ | Extremely high resolving power |

Velocity precision and velocity resolution are not identical. With high signal-to-noise, stable calibration, and good line modeling, centroid precision can be better than one resolution element.

## Cosmology-specific units

| Domain | Unit name | Symbol | SI conversion / definition | Practical notes |
|---|---:|---:|---:|---|
| Expansion rate | Hubble constant units | $$\mathrm{km\,s^{-1}\,Mpc^{-1}}$$ | $$1\,\mathrm{km\,s^{-1}\,Mpc^{-1}}\approx3.24078\times10^{-20}\,\mathrm{s^{-1}}$$ | Standard reporting for $$H_0$$ |
| Parameter | reduced Hubble parameter | $$h$$ | $$h=H_0/(100\,\mathrm{km\,s^{-1}\,Mpc^{-1}})$$ | Used in $$h^{-1}\,\mathrm{Mpc}$$ and $$h\,\mathrm{Mpc^{-1}}$$ |
| Wavenumber | comoving wavenumber | $$k$$ | often $$h\,\mathrm{Mpc^{-1}}$$ | Large-scale-structure power spectra |
| Power spectrum | 3D matter power | $$P(k)$$ | often $$(\mathrm{Mpc}/h)^3$$ | Depends on Fourier convention |
| Density | critical density | $$\rho_c$$ | $$\rho_c=3H^2/(8\pi G)$$ | Expressed in $$\mathrm{kg\,m^{-3}}$$ or $$M_\odot\,\mathrm{Mpc^{-3}}$$ |
| Density parameter | Omega | $$\Omega_i$$ | dimensionless | Fraction of critical density |
| Fluctuation amplitude | sigma-eight | $$\sigma_8$$ | dimensionless | RMS in spheres of $$8\,h^{-1}\,\mathrm{Mpc}$$ |

## Cosmology unit conversion anchors

| Quantity | Conversion / relation | Practical use |
|---|---:|---|
| Hubble unit | $$1\,\mathrm{km\,s^{-1}\,Mpc^{-1}}=3.24078\times10^{-20}\,\mathrm{s^{-1}}$$ | Converts $$H_0$$ to inverse time |
| Reduced Hubble parameter | $$h=H_0/(100\,\mathrm{km\,s^{-1}\,Mpc^{-1}})$$ | Used in distances, masses, and densities |
| Hubble time | $$H_0^{-1}=9.778\,h^{-1}\,\mathrm{Gyr}$$ | Expansion timescale |
| Hubble distance | $$c/H_0=2997.92\,h^{-1}\,\mathrm{Mpc}$$ | Cosmological distance scale |
| Critical density | $$\rho_c=3H^2/(8\pi G)$$ | Normalizes $$\Omega_i$$ |
| Critical density, SI | $$\rho_{c,0}=1.878\times10^{-26}h^2\,\mathrm{kg\,m^{-3}}$$ | Very low density by terrestrial standards |
| Critical density, CGS | $$\rho_{c,0}=1.878\times10^{-29}h^2\,\mathrm{g\,cm^{-3}}$$ | Common cosmology expression |
| Critical density, astronomical | $$\rho_{c,0}=2.775\times10^{11}h^2\,M_\odot\,\mathrm{Mpc^{-3}}$$ | Useful for halos and simulations |

## $$h$$-dependent unit conventions

| Notation | Meaning | How to convert |
|---|---:|---|
| $$h^{-1}\,\mathrm{Mpc}$$ | distance scaled by inverse $$h$$ | Physical Mpc value is numerical value divided by $$h$$ |
| $$h\,\mathrm{Mpc^{-1}}$$ | wavenumber scaled by $$h$$ | Physical $$\mathrm{Mpc^{-1}}$$ value is numerical value times $$h$$ |
| $$h^{-1}M_\odot$$ | mass scaled by inverse $$h$$ | Physical solar masses are numerical value divided by $$h$$ |
| $$h^{-2}L_\odot$$ | luminosity scaled by inverse $$h^2$$ | Often appears because luminosity depends on distance squared |
| $$(\mathrm{Mpc}/h)^3$$ | volume unit | Common for simulation boxes and power spectra |
| $$h^3\,\mathrm{Mpc^{-3}}$$ | number-density unit | Inverse of $$(\mathrm{Mpc}/h)^3$$ |

For example, if $$h=0.7$$, then $$100\,h^{-1}\,\mathrm{Mpc}=142.9\,\mathrm{Mpc}$$. But $$0.1\,h\,\mathrm{Mpc^{-1}}=0.07\,\mathrm{Mpc^{-1}}$$.

## Redshift and velocity scaffolding

| Regime | Relation | Use |
|---|---:|---|
| Small redshift | $$v\approx cz$$ | Works only when $$z\ll1$$ and peculiar velocities are not dominant |
| Observed wavelength | $$\lambda_{\mathrm{obs}}=(1+z)\lambda_{\mathrm{rest}}$$ | Spectroscopic redshift |
| Observed frequency | $$\nu_{\mathrm{obs}}=\nu_{\mathrm{rest}}/(1+z)$$ | Radio and millimetre line observations |
| Scale factor | $$a=1/(1+z)$$ | Cosmological expansion |
| Time dilation | $$\Delta t_{\mathrm{obs}}=(1+z)\Delta t_{\mathrm{em}}$$ | Supernovae, quasars, transients |
| Surface-brightness dimming | $$I_{\mathrm{obs}}\propto(1+z)^{-4}$$ | Tolman dimming and high-redshift galaxy imaging |

The approximation $$v\approx cz$$ is not a general high-redshift velocity formula. At high $$z$$, redshift primarily describes cosmological scale-factor change, not ordinary Doppler motion through static space.

## Common cosmological scale anchors

| Quantity | Approximate scale | Use |
|---|---:|---|
| $$H_0$$ | about $$70\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$$ | Common present-day expansion-rate scale |
| $$h$$ | about $$0.7$$ | Practical reduced-Hubble parameter scale |
| Hubble time | about $$14\,\mathrm{Gyr}$$ | Comparable to cosmic age |
| Hubble distance | about $$4.3\,\mathrm{Gpc}$$ | Expansion distance scale |
| Cosmic microwave background temperature | about $$2.725\,\mathrm{K}$$ | Thermal relic background |
| Matter density parameter | about $$0.3$$ | Late-time structure formation |
| Dark-energy density parameter | about $$0.7$$ | Late-time acceleration |
| Baryon density parameter | about $$0.05$$ | Ordinary matter fraction |
| Typical galaxy cluster mass | $$10^{14}\text{--}10^{15}\,M_\odot$$ | Cluster cosmology |
| Milky-Way-like halo mass | about $$10^{12}\,M_\odot$$ | Galactic halo scale |

These are typical current-order anchors, not permanent constants. Cosmological parameters depend on data set, model, and convention.

## Power spectrum and simulation-unit scaffold

| Quantity | Common unit | Interpretation |
|---|---:|---|
| Comoving position | $$h^{-1}\,\mathrm{Mpc}$$ or $$\mathrm{Mpc}$$ | Simulation coordinates often use comoving coordinates |
| Comoving wavenumber | $$h\,\mathrm{Mpc^{-1}}$$ | Fourier-space scale |
| Matter power spectrum | $$(\mathrm{Mpc}/h)^3$$ | Depends on Fourier convention |
| Dimensionless power | $$\Delta^2(k)=k^3P(k)/(2\pi^2)$$ | Contribution per logarithmic interval in $$k$$ |
| Correlation function | dimensionless | Real-space clustering |
| Halo mass | $$h^{-1}M_\odot$$ or $$M_\odot$$ | Must check convention |
| Number density | $$h^3\,\mathrm{Mpc^{-3}}$$ | Galaxy or halo abundance |

## Useful reciprocal scale table for $$k$$

| Wavenumber | Approximate comoving scale $$2\pi/k$$ | Physical meaning |
|---:|---:|---|
| $$k=0.001\,h\,\mathrm{Mpc^{-1}}$$ | $$6283\,h^{-1}\,\mathrm{Mpc}$$ | Horizon-scale or largest modes |
| $$k=0.01\,h\,\mathrm{Mpc^{-1}}$$ | $$628\,h^{-1}\,\mathrm{Mpc}$$ | Very large-scale structure |
| $$k=0.1\,h\,\mathrm{Mpc^{-1}}$$ | $$62.8\,h^{-1}\,\mathrm{Mpc}$$ | BAO and linear clustering regime |
| $$k=1\,h\,\mathrm{Mpc^{-1}}$$ | $$6.28\,h^{-1}\,\mathrm{Mpc}$$ | Nonlinear galaxy and halo scales |
| $$k=10\,h\,\mathrm{Mpc^{-1}}$$ | $$0.628\,h^{-1}\,\mathrm{Mpc}$$ | Small-scale nonlinear structure |

Some authors use $$1/k$$ as a rough scale instead of $$2\pi/k$$. Always specify which convention is being used.

## Astrophysical density units

| Unit | Conversion / relation | Use |
|---|---:|---|
| Number density, SI | $$\mathrm{m^{-3}}$$ | Plasma physics and formal SI |
| Number density, CGS | $$1\,\mathrm{cm^{-3}}=10^6\,\mathrm{m^{-3}}$$ | ISM, ICM, plasma astrophysics |
| Mass density | $$1\,\mathrm{g\,cm^{-3}}=10^3\,\mathrm{kg\,m^{-3}}$$ | Stellar and planetary interiors |
| Surface density | $$1\,M_\odot\,\mathrm{pc^{-2}}\approx2.089\times10^{-3}\,\mathrm{kg\,m^{-2}}$$ | Galactic disks and gas columns |
| Volume density | $$1\,M_\odot\,\mathrm{pc^{-3}}\approx6.77\times10^{-20}\,\mathrm{kg\,m^{-3}}$$ | Stellar neighborhoods and dark matter |
| Column density | $$\mathrm{cm^{-2}}$$ | Absorption systems and ISM gas |
| Hydrogen column to extinction | $$N_H/A_V\sim10^{21}\,\mathrm{cm^{-2}\,mag^{-1}}$$ | Dust and gas rough estimate |

## Pressure and temperature in astrophysical gas

| Quantity | Unit / relation | Practical use |
|---|---:|---|
| Thermal pressure | $$P=nk_BT$$ | Gas equation of state |
| Pressure in ISM convention | $$P/k_B$$ in $$\mathrm{K\,cm^{-3}}$$ | Avoids tiny SI pressure values |
| Conversion | $$1\,\mathrm{K\,cm^{-3}}=1.380649\times10^{-17}\,\mathrm{Pa}$$ | Since $$1\,\mathrm{cm^{-3}}=10^6\,\mathrm{m^{-3}}$$ |
| ICM temperature | $$1\text{--}10\,\mathrm{keV}$$ | Galaxy clusters |
| Warm ionized gas | about $$10^4\,\mathrm{K}$$ | H II regions |
| Cold molecular gas | about $$10\,\mathrm{K}$$ | Star-forming clouds |
| Virialized halo gas | $$10^6\text{--}10^7\,\mathrm{K}$$ | Massive galaxies and groups |

## Magnetic-field units

| Unit | Conversion | Practical use |
|---|---:|---|
| Tesla | $$1\,\mathrm{T}$$ | SI magnetic field |
| Gauss | $$1\,\mathrm{G}=10^{-4}\,\mathrm{T}$$ | Solar, stellar, and ISM legacy unit |
| Microgauss | $$1\,\mathrm{\mu G}=10^{-10}\,\mathrm{T}$$ | Interstellar magnetic fields |
| Milligauss | $$1\,\mathrm{mG}=10^{-7}\,\mathrm{T}$$ | Dense clouds and maser regions |
| Kilogauss | $$1\,\mathrm{kG}=0.1\,\mathrm{T}$$ | Stellar magnetic fields |
| Magnetic pressure, CGS | $$P_B=B^2/(8\pi)$$ in $$\mathrm{erg\,cm^{-3}}$$ when $$B$$ is in gauss | Common in plasma astrophysics |
| Magnetic pressure, SI | $$P_B=B^2/(2\mu_0)$$ | SI formulation |

## Proper motion and tangential velocity

| Relation | Convenient form | Use |
|---|---:|---|
| Tangential velocity | $$v_t=4.74047\,\mu\,d$$ | $$v_t$$ in $$\mathrm{km\,s^{-1}}$$, $$\mu$$ in $$\mathrm{arcsec\,yr^{-1}}$$, $$d$$ in pc |
| mas version | $$v_t=4.74047\,\mu_{\mathrm{mas/yr}}d_{\mathrm{kpc}}$$ | Very useful for Gaia |
| Proper motion from velocity | $$\mu_{\mathrm{mas/yr}}=v_t/(4.74047d_{\mathrm{kpc}})$$ | Converts dynamics to observed motion |
| Scale example | $$1\,\mathrm{mas\,yr^{-1}}$$ at $$1\,\mathrm{kpc}$$ equals $$4.74047\,\mathrm{km\,s^{-1}}$$ | Gaia mental anchor |

## Parallax distance scaffold

| Quantity | Relation | Practical use |
|---|---:|---|
| Parallax in arcsec | $$d[\mathrm{pc}]=1/\varpi[\mathrm{arcsec}]$$ | Classical parsec definition |
| Parallax in mas | $$d[\mathrm{pc}]=1000/\varpi[\mathrm{mas}]$$ | Gaia-style data |
| $$10\,\mathrm{mas}$$ | $$100\,\mathrm{pc}$$ | Nearby stars |
| $$1\,\mathrm{mas}$$ | $$1\,\mathrm{kpc}$$ | Galactic-scale astrometry |
| $$0.1\,\mathrm{mas}$$ | $$10\,\mathrm{kpc}$$ | Distant Milky Way |
| $$0.01\,\mathrm{mas}$$ | $$100\,\mathrm{kpc}$$ | Milky Way halo or satellites |

When parallax uncertainty is large, simply using $$d=1/\varpi$$ can become statistically biased. Bayesian distance inference may be needed.

# Appendix A. Worked conversion examples

## A1. Angular distance to physical distance

| Problem | Calculation | Result | Interpretation |
|---|---:|---:|---|
| A binary star has angular separation $$0.5″$$ at $$100\,\mathrm{pc}$$. What is the projected separation? | Since $$1″$$ at $$D\,\mathrm{pc}$$ corresponds to $$D\,\mathrm{au}$$, $$0.5″\times100=50\,\mathrm{au}$$ | $$50\,\mathrm{au}$$ | No need to first convert to radians; the parsec definition already contains the geometry |
| A disk has angular radius $$2″$$ at $$140\,\mathrm{pc}$$. What is its radius? | $$2\times140=280\,\mathrm{au}$$ | $$280\,\mathrm{au}$$ | Taurus-like star-forming region scale |
| A galaxy feature subtends $$10″$$ at $$1\,\mathrm{Mpc}$$. What is its size? | At $$1\,\mathrm{Mpc}$$, $$1″\approx4.848\,\mathrm{pc}$$, so $$10″\approx48.5\,\mathrm{pc}$$ | $$48.5\,\mathrm{pc}$$ | Nearby-galaxy imaging scale |
| A source subtends $$1′$$ at $$10\,\mathrm{kpc}$$. What is its size? | $$1′=60″$$; at $$10\,\mathrm{kpc}=10000\,\mathrm{pc}$$, $$1″=10000\,\mathrm{au}=0.0485\,\mathrm{pc}$$, so $$60″\approx2.91\,\mathrm{pc}$$ | $$2.91\,\mathrm{pc}$$ | Star clusters, supernova remnants, H II regions |

The core scaffold is $$s\approx D\theta$$, but when $$D$$ is in parsecs and $$\theta$$ is in arcseconds, the shortcut is $$s[\mathrm{au}]\approx\theta[″]D[\mathrm{pc}]$$.

## A2. Parallax, distance, and distance modulus

| Problem | Calculation | Result | Interpretation |
|---|---:|---:|---|
| A star has parallax $$10\,\mathrm{mas}$$. What is its distance? | $$d[\mathrm{pc}]=1000/\varpi[\mathrm{mas}]=1000/10$$ | $$100\,\mathrm{pc}$$ | Most common Gaia parallax conversion |
| A star has parallax $$2\,\mathrm{mas}$$. What is its distance? | $$1000/2=500$$ | $$500\,\mathrm{pc}$$ | Smaller parallax means larger distance |
| What is the distance modulus at $$100\,\mathrm{pc}$$? | $$\mu=5\log_{10}(100/10)=5$$ | $$5\,\mathrm{mag}$$ | Ten times farther than $$10\,\mathrm{pc}$$ means five magnitudes fainter |
| What is the distance modulus at $$1\,\mathrm{kpc}$$? | $$\mu=5\log_{10}(1000/10)=10$$ | $$10\,\mathrm{mag}$$ | $$1\,\mathrm{kpc}$$ is $$100$$ times farther than $$10\,\mathrm{pc}$$ |
| An object has $$m=15$$ and $$M=5$$. What is the distance? | $$m-M=10=5\log_{10}(d/10\,\mathrm{pc})$$, so $$d=1000\,\mathrm{pc}$$ | $$1\,\mathrm{kpc}$$ | Classic photometric-distance calculation |

The distance $$d$$ in the distance modulus must be in parsecs, not metres, kiloparsecs, or light-years.

## A3. Proper motion to tangential velocity

| Problem | Calculation | Result | Interpretation |
|---|---:|---:|---|
| A star has $$\mu=10\,\mathrm{mas\,yr^{-1}}$$ at $$100\,\mathrm{pc}$$. What is $$v_t$$? | Use $$v_t=4.74047\mu[\mathrm{arcsec\,yr^{-1}}]d[\mathrm{pc}]$$. Here $$10\,\mathrm{mas\,yr^{-1}}=0.010\,\mathrm{arcsec\,yr^{-1}}$$, so $$v_t=4.74047\times0.010\times100$$ | $$4.74\,\mathrm{km\,s^{-1}}$$ | Ordinary nearby-stellar transverse speed |
| Same source using Gaia form | $$v_t=4.74047\mu_{\mathrm{mas/yr}}d_{\mathrm{kpc}}=4.74047\times10\times0.1$$ | $$4.74\,\mathrm{km\,s^{-1}}$$ | More convenient for Gaia catalogs |
| A source has $$\mu=1\,\mathrm{mas\,yr^{-1}}$$ at $$1\,\mathrm{kpc}$$ | $$v_t=4.74047\times1\times1$$ | $$4.74\,\mathrm{km\,s^{-1}}$$ | Essential Gaia mental anchor |
| A star moving at $$100\,\mathrm{km\,s^{-1}}$$ at $$10\,\mathrm{kpc}$$ has what proper motion? | $$\mu_{\mathrm{mas/yr}}=v_t/(4.74047d_{\mathrm{kpc}})=100/(4.74047\times10)$$ | $$2.11\,\mathrm{mas\,yr^{-1}}$$ | Still measurable in Galactic dynamics |

## A4. Flux, luminosity, and distance squared

| Problem | Calculation | Result | Interpretation |
|---|---:|---:|---|
| What is the flux of $$1\,L_\odot$$ at $$10\,\mathrm{pc}$$? | $$F=L/(4\pi d^2)$$, with $$L=3.828\times10^{26}\,\mathrm{W}$$ and $$d=10\,\mathrm{pc}=3.086\times10^{17}\,\mathrm{m}$$ | $$3.20\times10^{-10}\,\mathrm{W\,m^{-2}}$$ | Solar-luminosity source at absolute-magnitude reference distance |
| Same source at $$100\,\mathrm{pc}$$ | Distance is $$10$$ times larger, so flux is $$100$$ times smaller | $$3.20\times10^{-12}\,\mathrm{W\,m^{-2}}$$ | Inverse-square law |
| A galaxy has $$L=10^{10}L_\odot$$ at $$10\,\mathrm{Mpc}$$ | Compared with $$1L_\odot$$ at $$10\,\mathrm{pc}$$, luminosity is $$10^{10}$$ larger but distance is $$10^6$$ times larger, so flux factor is $$10^{10}/10^{12}=10^{-2}$$ | $$3.20\times10^{-12}\,\mathrm{W\,m^{-2}}$$ | Ordinary galaxy total-flux scale |
| If distance doubles | $$F\propto d^{-2}$$ | flux becomes $$1/4$$ | Basic quantity check |

If a luminosity-distance calculation changes linearly with distance rather than with distance squared, it is wrong unless the quantity is not flux.

## A5. AB magnitude, Jy, and μJy

| Problem | Calculation | Result | Interpretation |
|---|---:|---:|---|
| What flux density is $$m_{\mathrm{AB}}=23.9$$? | Standard shortcut | $$1\,\mathrm{\mu Jy}$$ | Most useful AB magnitude anchor |
| What is $$m_{\mathrm{AB}}=20$$ in μJy? | $$f_\nu[\mathrm{\mu Jy}]=10^{(23.9-m)/2.5}$$, so $$10^{(23.9-20)/2.5}=10^{1.56}$$ | $$36.3\,\mathrm{\mu Jy}$$ | Ordinary deep-imaging source |
| What is $$m_{\mathrm{AB}}=25$$ in μJy? | $$10^{(23.9-25)/2.5}=10^{-0.44}$$ | $$0.363\,\mathrm{\mu Jy}$$ | Very deep imaging |
| What is $$1\,\mathrm{mJy}$$ in AB mag? | $$1\,\mathrm{mJy}=1000\,\mathrm{\mu Jy}$$. Since $$1\,\mathrm{\mu Jy}$$ is $$23.9$$ mag, brighter by $$1000$$ means lower by $$7.5$$ mag | $$16.4\,\mathrm{mag}$$ | Radio and IR flux-density intuition |
| What is $$1\,\mathrm{nMgy}$$ in AB mag? | $$m\approx22.5-2.5\log_{10}(1)$$ | $$22.5$$ | SDSS-style catalog flux anchor |

Every factor of $$10$$ in flux corresponds to $$2.5\,\mathrm{mag}$$. Brighter flux means smaller magnitude.

## A6. Converting $$f_\nu$$ and $$f_\lambda$$

| Problem | Calculation | Result | Interpretation |
|---|---:|---:|---|
| Convert $$1\,\mathrm{Jy}$$ at $$5000\,\unicode{x212B}$$ to $$f_\lambda$$ in $$\mathrm{erg\,s^{-1}\,cm^{-2}\,\unicode{x212B}^{-1}}$$ | Use $$f_\lambda=f_\nu c/\lambda^2$$ and include the per-angstrom conversion | about $$1.20\times10^{-12}\,\mathrm{erg\,s^{-1}\,cm^{-2}\,\unicode{x212B}^{-1}}$$ | Optical SED sanity check |
| Convert $$1\,\mathrm{\mu Jy}$$ at $$1\,\mathrm{\mu m}$$ to $$f_\lambda$$ | Scale from $$1\,\mathrm{Jy}$$ by $$10^{-6}$$ and from wavelength by $$\lambda^{-2}$$ | about $$3.0\times10^{-19}\,\mathrm{erg\,s^{-1}\,cm^{-2}\,\unicode{x212B}^{-1}}$$ | Faint near-IR source |
| If $$f_\nu$$ is flat | $$f_\lambda\propto\lambda^{-2}$$ | not flat in wavelength units | A flat spectrum is coordinate-dependent |
| If $$\nu f_\nu$$ is flat | equal energy per logarithmic frequency interval | SED interpretation | Common in broadband SED plots |

The common error is forgetting the Jacobian. Since $$d\nu=-(c/\lambda^2)d\lambda$$, spectral density changes when the spectral coordinate changes.

## A7. Photon counting and detector counts

| Problem | Calculation | Result | Interpretation |
|---|---:|---:|---|
| Photon energy at $$500\,\mathrm{nm}$$ | $$E=hc/\lambda\approx1240\,\mathrm{eV\,nm}/500\,\mathrm{nm}$$ | $$2.48\,\mathrm{eV}$$ | Optical photon energy |
| Same in joules | $$2.48\,\mathrm{eV}\times1.602\times10^{-19}\,\mathrm{J/eV}$$ | $$3.97\times10^{-19}\,\mathrm{J}$$ | Needed for photon-rate estimate |
| A detector receives $$10^{-15}\,\mathrm{W}$$ at $$500\,\mathrm{nm}$$. Photon rate? | $$N_\gamma=P/E_\gamma=10^{-15}/(3.97\times10^{-19})$$ | $$2.52\times10^3\,\mathrm{photons\,s^{-1}}$$ | Photon-counting scale |
| With $$\mathrm{QE}=0.8$$ | $$N_{e^-}=0.8N_\gamma$$ | $$2.02\times10^3\,e^-\,\mathrm{s^{-1}}$$ | Electrons generated |
| With gain $$g=2\,e^-/\mathrm{ADU}$$ | $$\mathrm{ADU/s}=N_{e^-}/g$$ | $$1.01\times10^3\,\mathrm{ADU\,s^{-1}}$$ | Detector raw count-rate scale |

Photons, electrons, and ADU are not the same thing. A photon is an incident radiation quantum; an electron is the charge carrier produced in the detector; ADU is the digitized readout unit.

## A8. SNR estimation

| Problem | Calculation | Result | Interpretation |
|---|---:|---:|---|
| Source signal $$S=10^4\,e^-$$, negligible background and read noise | $$\mathrm{SNR}\approx\sqrt{S}$$ | $$100$$ | Source-limited |
| Source $$S=10^4\,e^-$$, background $$B=10^4\,e^-$$ in aperture | $$\mathrm{SNR}=S/\sqrt{S+B}=10^4/\sqrt{2\times10^4}$$ | $$70.7$$ | Background lowers SNR |
| Source $$S=100\,e^-$$, $$n_{\mathrm{pix}}=25$$, RN $$=5\,e^-$$, negligible background | denominator is $$\sqrt{100+25\times25}=\sqrt{725}$$ | $$3.71$$ | Read-noise-limited or near that regime |
| To double SNR in source-limited case | Need $$4$$ times the signal | exposure time multiplied by $$4$$ | Because $$\mathrm{SNR}\propto\sqrt{t}$$ |
| To gain $$1\,\mathrm{mag}$$ deeper at same SNR in background-limited imaging | Need flux $$2.512$$ times fainter, so exposure roughly $$2.512^2$$ times longer | $$6.31$$ times longer | Deep imaging becomes expensive quickly |

## A9. Spectral resolving power

| Problem | Calculation | Result | Interpretation |
|---|---:|---:|---|
| Instrument has $$R=3000$$. What is velocity resolution? | $$\Delta v\approx c/R=300000/3000$$ | $$100\,\mathrm{km\,s^{-1}}$$ | Medium-resolution spectra |
| At $$\lambda=6000\,\unicode{x212B}$$ and $$R=3000$$, what is $$\Delta\lambda$$? | $$\Delta\lambda=\lambda/R=6000/3000$$ | $$2\,\unicode{x212B}$$ | Unresolved-line FWHM scale |
| Instrument has $$R=50000$$ | $$\Delta v\approx300000/50000$$ | $$6\,\mathrm{km\,s^{-1}}$$ | High-resolution stellar spectroscopy |
| Desired velocity precision $$1\,\mathrm{km\,s^{-1}}$$ | Need $$R\sim300000$$ for the raw resolution scale | $$R\sim3\times10^5$$ | Actual radial-velocity precision can exceed one resolution element with modeling |

## A10. Redshifted lines

| Rest line | Redshift | Observed wavelength / frequency | Interpretation |
|---|---:|---:|---|
| Hα $$6562.8\,\unicode{x212B}$$ | $$z=0.1$$ | $$\lambda_{\mathrm{obs}}=7219\,\unicode{x212B}$$ | Optical redshift survey |
| Hα $$6562.8\,\unicode{x212B}$$ | $$z=1$$ | $$1.3126\,\mathrm{\mu m}$$ | Moves to near-IR |
| Lyα $$1215.67\,\unicode{x212B}$$ | $$z=6$$ | $$8510\,\unicode{x212B}$$ | High-redshift galaxy and quasar searches |
| 21-cm line $$1420.4058\,\mathrm{MHz}$$ | $$z=1$$ | $$710.2\,\mathrm{MHz}$$ | Observed frequency decreases by $$1+z$$ |
| CO rest frequency $$115.27\,\mathrm{GHz}$$ | $$z=2$$ | $$38.42\,\mathrm{GHz}$$ | Millimetre and radio line surveys |

Wavelengths stretch as $$\lambda_{\mathrm{obs}}=(1+z)\lambda_{\mathrm{rest}}$$, while frequencies shrink as $$\nu_{\mathrm{obs}}=\nu_{\mathrm{rest}}/(1+z)$$.

## A11. Hubble units and the $$h$$ convention

| Problem | Calculation | Result | Interpretation |
|---|---:|---:|---|
| If $$H_0=70\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$$, what is $$h$$? | $$h=70/100$$ | $$0.7$$ | Reduced Hubble parameter |
| Convert $$100\,h^{-1}\,\mathrm{Mpc}$$ for $$h=0.7$$ | $$100/0.7$$ | $$142.9\,\mathrm{Mpc}$$ | Inverse-$$h$$ distance |
| Convert $$0.1\,h\,\mathrm{Mpc^{-1}}$$ for $$h=0.7$$ | $$0.1\times0.7$$ | $$0.07\,\mathrm{Mpc^{-1}}$$ | $$h$$-scaled wavenumber |
| Convert $$10^{12}\,h^{-1}M_\odot$$ for $$h=0.7$$ | $$10^{12}/0.7$$ | $$1.43\times10^{12}M_\odot$$ | Halo mass convention |
| Convert $$10^{-3}h^3\,\mathrm{Mpc^{-3}}$$ for $$h=0.7$$ | $$10^{-3}\times0.7^3$$ | $$3.43\times10^{-4}\,\mathrm{Mpc^{-3}}$$ | Number-density convention |

$$h^{-1}\,\mathrm{Mpc}$$ and $$h\,\mathrm{Mpc^{-1}}$$ transform in opposite directions.

## A12. Critical density intuition

| Quantity | Value / calculation | Interpretation |
|---|---:|---|
| Critical density | $$\rho_c\approx1.878\times10^{-26}h^2\,\mathrm{kg\,m^{-3}}$$ | Extremely low by laboratory standards |
| For $$h=0.7$$ | $$\rho_c\approx9.20\times10^{-27}\,\mathrm{kg\,m^{-3}}$$ | Present-day critical-density scale |
| In proton masses | divide by $$m_p\approx1.67\times10^{-27}\,\mathrm{kg}$$ | About $$5.5$$ proton masses per cubic metre |
| Matter density if $$\Omega_m=0.3$$ | $$0.3\rho_c$$ | About $$1.7$$ proton masses per cubic metre |
| Baryon density if $$\Omega_b=0.05$$ | $$0.05\rho_c$$ | Less than one proton mass per cubic metre on average |

Cosmological density looks absurdly small in everyday units, but gravity integrates it over enormous volumes.

# Appendix B. Common mistake checklist

| Mistake | Wrong move | Correct move | Why it matters |
|---|---|---|---|
| Degree used directly in small-angle formula | Use $$s=D\theta$$ with $$\theta=1$$ for $$1^\circ$$ | Convert $$1^\circ$$ to $$\pi/180$$ rad | Radian is required in geometric formulas |
| Arcsecond not converted | Use $$1″=1$$ rad | Use $$1″=4.848\times10^{-6}$$ rad, or use the parsec shortcut | Error by factor $$206265$$ |
| Confusing pc and ly | Treat $$1\,\mathrm{pc}=1\,\mathrm{ly}$$ | $$1\,\mathrm{pc}=3.26\,\mathrm{ly}$$ | Common public-facing conversion error |
| Forgetting inverse-square law | Flux scales as $$1/d$$ | Flux scales as $$1/d^2$$ | Huge error in luminosity estimates |
| Magnitude direction reversed | Larger magnitude means brighter | Larger magnitude means fainter | Magnitude scale is inverted |
| Treating magnitude as linear | Add fluxes by adding magnitudes | Convert to linear flux, add, then convert back | Magnitudes are logarithmic |
| Mixing $$f_\nu$$ and $$f_\lambda$$ | Set them numerically equal | Use $$f_\nu=f_\lambda\lambda^2/c$$ | Spectral-density Jacobian |
| Forgetting per-angstrom conversion | Convert per cm as if per Å | Include $$1\,\unicode{x212B}=10^{-8}\,\mathrm{cm}$$ | Error by $$10^8$$ |
| Using ADU as electrons | Poisson noise equals $$\sqrt{\mathrm{ADU}}$$ | Convert ADU to electrons using gain | Noise model should be in physical counts |
| Misreading gain | Use $$e^-=\mathrm{ADU}/g$$ when $$g=e^-/\mathrm{ADU}$$ | Use $$e^-=g\times\mathrm{ADU}$$ | Convention must be checked |
| Ignoring surface brightness | Judge detectability by total magnitude only | Include angular area and background | Extended sources can be hard despite bright total magnitude |
| Treating $$z$$ as ordinary velocity at high redshift | Use $$v=cz$$ at $$z=3$$ | Use cosmological redshift relations | High redshift is not simple Newtonian Doppler velocity |
| Confusing physical and comoving distance | Compare without specifying convention | State physical, proper, comoving, angular-diameter, or luminosity distance | Cosmology distances are convention-dependent |
| Mishandling $$h$$ | Convert $$h^{-1}\,\mathrm{Mpc}$$ by multiplying by $$h$$ | Divide by $$h$$ | Opposite-direction error |
| Forgetting bandpass | Quote magnitude without filter or system | State band and system, such as $$g_{\mathrm{AB}}$$ | Magnitude is not a universal flux unless the system is specified |
| Treating nominal solar constants as measured updates | Say nominal values are latest measurements | Say they are exact conversion constants | IAU nominal values are reporting standards |

# Appendix C. Minimum formula sheet

| Topic | Formula | Use |
|---|---:|---|
| Small angle | $$s\approx D\theta$$ | $$\theta$$ in radians |
| Parsecs | $$d[\mathrm{pc}]=1/\varpi[\mathrm{arcsec}]$$ | Parallax distance |
| Arcsecond shortcut | $$s[\mathrm{au}]\approx\theta[″]D[\mathrm{pc}]$$ | Visual binaries and disks |
| Distance modulus | $$\mu=m-M=5\log_{10}(d/10\,\mathrm{pc})$$ | Photometric distance |
| Flux-luminosity | $$F=L/(4\pi d_L^2)$$ | Source brightness |
| Magnitude ratio | $$m_1-m_2=-2.5\log_{10}(F_1/F_2)$$ | Brightness comparison |
| AB magnitude | $$m_{\mathrm{AB}}=-2.5\log_{10}(f_\nu/3631\,\mathrm{Jy})$$ | Survey photometry |
| Spectral density | $$f_\nu d\nu=f_\lambda d\lambda$$ | SED conversion |
| Photon energy | $$E=h\nu=hc/\lambda$$ | Photon counting |
| Doppler small shift | $$\Delta v/c\approx\Delta\lambda/\lambda$$ | Radial velocities |
| Resolving power | $$R=\lambda/\Delta\lambda\approx c/\Delta v$$ | Spectroscopy |
| Redshift wavelength | $$\lambda_{\mathrm{obs}}=(1+z)\lambda_{\mathrm{rest}}$$ | Line identification |
| Redshift frequency | $$\nu_{\mathrm{obs}}=\nu_{\mathrm{rest}}/(1+z)$$ | Radio and millimetre lines |
| Proper-motion velocity | $$v_t=4.74047\mu[\mathrm{arcsec\,yr^{-1}}]d[\mathrm{pc}]$$ | Astrometry |
| Critical density | $$\rho_c=3H^2/(8\pi G)$$ | Cosmology |
| Hubble parameter | $$h=H_0/(100\,\mathrm{km\,s^{-1}\,Mpc^{-1}})$$ | $$h$$ convention |

# Appendix D. Final sanity-check table

| Quantity | Good mental anchor | Why it is useful |
|---|---:|---|
| $$1\,\mathrm{pc}$$ | $$3.26\,\mathrm{ly}=206265\,\mathrm{au}$$ | Converts public and research distance units |
| $$1″$$ at $$1\,\mathrm{pc}$$ | $$1\,\mathrm{au}$$ | Small-angle geometry |
| $$1\,\mathrm{mas}$$ at $$1\,\mathrm{kpc}$$ | $$1\,\mathrm{au}$$ | Astrometry and binaries |
| $$1\,\mathrm{km\,s^{-1}}$$ for $$1\,\mathrm{Myr}$$ | $$1.02\,\mathrm{pc}$$ | Galactic dynamics shortcut |
| $$m_{\mathrm{AB}}=23.9$$ | $$1\,\mathrm{\mu Jy}$$ | Survey-depth intuition |
| $$5\,\mathrm{mag}$$ | factor $$100$$ in flux | Magnitude-system anchor |
| $$1\,\mathrm{Jy}$$ | $$10^{-26}\,\mathrm{W\,m^{-2}\,Hz^{-1}}$$ | Radio and SED anchor |
| $$1\,\mathrm{eV}$$ | $$11604.5\,\mathrm{K}$$ | Plasma-temperature bridge |
| $$1\,\mathrm{keV}$$ | $$1.16\times10^7\,\mathrm{K}$$ | X-ray gas |
| $$1\,\mathrm{keV}$$ | $$12.398\,\unicode{x212B}$$ | X-ray spectroscopy |
| $$1\,L_\odot$$ | $$3.828\times10^{26}\,\mathrm{W}$$ | Stellar-luminosity anchor |
| $$1\,R_\odot$$ | $$6.957\times10^8\,\mathrm{m}$$ | Stellar-radius anchor |
| $$H_0^{-1}$$ | $$9.78h^{-1}\,\mathrm{Gyr}$$ | Cosmic expansion timescale |
| $$c/H_0$$ | $$2998h^{-1}\,\mathrm{Mpc}$$ | Cosmic distance scale |
| $$\rho_c$$ | $$1.878\times10^{-26}h^2\,\mathrm{kg\,m^{-3}}$$ | Cosmological density anchor |
| Full sky | $$41253\,\mathrm{deg^2}$$ | Survey-area check |
| $$1\,\mathrm{sr}$$ | $$3282.8\,\mathrm{deg^2}$$ | Intensity and sky-area conversion |
| $$1\,\mathrm{arcsec^2}$$ | $$2.3504\times10^{-11}\,\mathrm{sr}$$ | Surface-brightness conversion |
| $$1\,\mathrm{\mu G}$$ | $$10^{-10}\,\mathrm{T}$$ | ISM magnetic fields |
| $$1\,\mathrm{cm^{-3}}$$ | $$10^6\,\mathrm{m^{-3}}$$ | Plasma and ISM density conversion |

## Practical conclusion

Astronomy and cosmology use many units not because the field lacks standardization, but because different observables live on extremely different physical scales. SI units provide the formal base. CGS remains common in radiative and plasma astrophysics. The parsec, astronomical unit, jansky, magnitude, arcsecond, electron-volt, and $$h^{-1}\,\mathrm{Mpc}$$ survive because they make the relevant measurements human-scale.

A good unit system in astronomy is therefore not merely a list of definitions. It is a working map between geometry, radiation, dynamics, detectors, and cosmological convention. Most unit mistakes are dimensional: forgetting that flux falls as distance squared, mixing $$\mathrm{cm^2}$$ and $$\mathrm{m^2}$$, treating $$f_\nu$$ and $$f_\lambda$$ as if no Jacobian were needed, using degrees or arcseconds in formulas that require radians, forgetting that magnitudes are logarithmic and reversed, or misreading $$h^{-1}\,\mathrm{Mpc}$$ as ordinary Mpc. The reliable workflow is to convert first into a linear physical unit, check the result against an anchor scale, and only then convert into the reporting convention used by a given subfield.

## Selected references

- [BIPM, The International System of Units, SI Brochure](https://www.bipm.org/en/publications/si-brochure): Official reference for SI definitions and fixed defining constants.
- [IAU 2012 Resolution B2 on the re-definition of the astronomical unit](https://www.iau.org/static/resolutions/IAU2012_English.pdf): Defines the astronomical unit as exactly $$149{,}597{,}870{,}700\,\mathrm{m}$$.
- [IAU 2015 Resolution B3 on nominal solar and planetary conversion constants](https://www.iau.org/static/resolutions/IAU2015_English.pdf): Defines nominal solar, terrestrial, and Jovian constants used as exact conversion factors.
- [NIST CODATA recommended values](https://physics.nist.gov/cuu/Constants/): Reference for physical constants such as $$G$$ and derived constants.
- [SDSS photometric flux calibration and magnitudes](https://www.sdss3.org/dr8/algorithms/magnitudes.php): Practical reference for AB magnitudes, maggies, nanomaggies, and SDSS-style catalog fluxes.
- [Hogg, Distance measures in cosmology](https://arxiv.org/abs/astro-ph/9905116): Standard pedagogical reference for cosmological distance definitions.

