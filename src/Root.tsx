import React from 'react';
import {Composition, Folder} from 'remotion';
import './index.css';
import './immopilier/fonts';
import {ActeI} from './immopilier/ActeI';
import {ActeII} from './immopilier/ActeII';
import {ActeIII} from './immopilier/ActeIII';
import {ActeIV} from './immopilier/ActeIV';
import {ActeV} from './immopilier/ActeV';
import {Immopilier} from './immopilier/Immopilier';
import {PlanSeul} from './immopilier/composants/PlanSeul';
import {Plan01} from './immopilier/plans/Plan01';
import {Plan02} from './immopilier/plans/Plan02';
import {Plan03} from './immopilier/plans/Plan03';
import {Plan04} from './immopilier/plans/Plan04';
import {Plan05} from './immopilier/plans/Plan05';
import {Plan06} from './immopilier/plans/Plan06';
import {Plan07} from './immopilier/plans/Plan07';
import {Plan08} from './immopilier/plans/Plan08';
import {Plan09} from './immopilier/plans/Plan09';
import {Plan10} from './immopilier/plans/Plan10';
import {Plan11} from './immopilier/plans/Plan11';
import {Plan12} from './immopilier/plans/Plan12';
import {Plan13} from './immopilier/plans/Plan13';
import {Plan14} from './immopilier/plans/Plan14';
import {Plan15} from './immopilier/plans/Plan15';
import {Plan16} from './immopilier/plans/Plan16';
import {Plan17} from './immopilier/plans/Plan17';
import {Plan18} from './immopilier/plans/Plan18';
import {Plan19} from './immopilier/plans/Plan19';
import {Plan20} from './immopilier/plans/Plan20';
import {Plan21} from './immopilier/plans/Plan21';
import {Plan22} from './immopilier/plans/Plan22';
import {Plan23} from './immopilier/plans/Plan23';
import {Plan24} from './immopilier/plans/Plan24';

/**
 * Chaque plan est aussi enregistré seul, à sa durée exacte du script, pour
 * pouvoir être revu et retouché isolément ; dans la composition complète, un
 * double-clic sur la séquence d'un plan y saute directement.
 *
 * `<PlanSeul>` leur redonne le fond qu'ils auront au montage : dans le film
 * c'est une couche continue, un plan isolé n'en verrait rien.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Immopilier"
        component={Immopilier}
        durationInFrames={4050}
        fps={60}
        width={1920}
        height={1080}
      />

      <Composition
        id="Acte-I"
        component={() => (
          <PlanSeul debut={0}>
            <ActeI />
          </PlanSeul>
        )}
        durationInFrames={510}
        fps={60}
        width={1920}
        height={1080}
      />

      <Folder name="Acte-I">
        <Composition
          id="Plan-01-Radar"
          component={() => (
            <PlanSeul debut={0}>
              <Plan01 />
            </PlanSeul>
          )}
          durationInFrames={144}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-02-Boussole"
          component={() => (
            <PlanSeul debut={144}>
              <Plan02 />
            </PlanSeul>
          )}
          durationInFrames={132}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-03-Fenetre"
          component={() => (
            <PlanSeul debut={276}>
              <Plan03 />
            </PlanSeul>
          )}
          durationInFrames={96}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-04-Constat"
          component={() => (
            <PlanSeul debut={372}>
              <Plan04 />
            </PlanSeul>
          )}
          durationInFrames={138}
          fps={60}
          width={1920}
          height={1080}
        />
      </Folder>

      <Composition
        id="Acte-II"
        component={() => (
          <PlanSeul debut={510}>
            <ActeII />
          </PlanSeul>
        )}
        durationInFrames={577}
        fps={60}
        width={1920}
        height={1080}
      />

      <Folder name="Acte-II">
        <Composition
          id="Plan-05-Etapes"
          component={() => (
            <PlanSeul debut={510}>
              <Plan05 />
            </PlanSeul>
          )}
          durationInFrames={240}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-06-Vignettes"
          component={() => (
            <PlanSeul debut={750}>
              <Plan06 />
            </PlanSeul>
          )}
          durationInFrames={199}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-07-Dossier"
          component={() => (
            <PlanSeul debut={949}>
              <Plan07 />
            </PlanSeul>
          )}
          durationInFrames={138}
          fps={60}
          width={1920}
          height={1080}
        />
      </Folder>

      <Composition
        id="Acte-III"
        component={() => (
          <PlanSeul debut={1087}>
            <ActeIII />
          </PlanSeul>
        )}
        durationInFrames={1969}
        fps={60}
        width={1920}
        height={1080}
      />

      <Folder name="Acte-III">
        <Composition
          id="Plan-08-Marque"
          component={() => (
            <PlanSeul debut={1087}>
              <Plan08 />
            </PlanSeul>
          )}
          durationInFrames={257}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-09-Parcelle"
          component={() => (
            <PlanSeul debut={1344}>
              <Plan09 />
            </PlanSeul>
          )}
          durationInFrames={264}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-10-Tuiles"
          component={() => (
            <PlanSeul debut={1608}>
              <Plan10 />
            </PlanSeul>
          )}
          durationInFrames={83}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-11-CartePrix"
          component={() => (
            <PlanSeul debut={1691}>
              <Plan11 />
            </PlanSeul>
          )}
          durationInFrames={180}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-12-Deroule"
          component={() => (
            <PlanSeul debut={1871}>
              <Plan12 />
            </PlanSeul>
          )}
          durationInFrames={96}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-13-Blocs"
          component={() => (
            <PlanSeul debut={1967}>
              <Plan13 />
            </PlanSeul>
          )}
          durationInFrames={150}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-14-Compteurs"
          component={() => (
            <PlanSeul debut={2117}>
              <Plan14 />
            </PlanSeul>
          )}
          durationInFrames={185}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-15-Couronne"
          component={() => (
            <PlanSeul debut={2302}>
              <Plan15 />
            </PlanSeul>
          )}
          durationInFrames={158}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-16-Entonnoir"
          component={() => (
            <PlanSeul debut={2460}>
              <Plan16 />
            </PlanSeul>
          )}
          durationInFrames={150}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-17-Comparaison"
          component={() => (
            <PlanSeul debut={2610}>
              <Plan17 />
            </PlanSeul>
          )}
          durationInFrames={182}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-18-Recap"
          component={() => (
            <PlanSeul debut={2792}>
              <Plan18 />
            </PlanSeul>
          )}
          durationInFrames={88}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-19-Agent"
          component={() => (
            <PlanSeul debut={2880}>
              <Plan19 />
            </PlanSeul>
          )}
          durationInFrames={176}
          fps={60}
          width={1920}
          height={1080}
        />
      </Folder>

      <Composition
        id="Acte-IV"
        component={() => (
          <PlanSeul debut={3056}>
            <ActeIV />
          </PlanSeul>
        )}
        durationInFrames={604}
        fps={60}
        width={1920}
        height={1080}
      />

      <Folder name="Acte-IV">
        <Composition
          id="Plan-20-Constellation"
          component={() => (
            <PlanSeul debut={3056}>
              <Plan20 />
            </PlanSeul>
          )}
          durationInFrames={124}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-21-Chiffres"
          component={() => (
            <PlanSeul debut={3180}>
              <Plan21 />
            </PlanSeul>
          )}
          durationInFrames={210}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-22-Faits"
          component={() => (
            <PlanSeul debut={3390}>
              <Plan22 />
            </PlanSeul>
          )}
          durationInFrames={270}
          fps={60}
          width={1920}
          height={1080}
        />
      </Folder>

      <Composition
        id="Acte-V"
        component={() => (
          <PlanSeul debut={3660}>
            <ActeV />
          </PlanSeul>
        )}
        durationInFrames={390}
        fps={60}
        width={1920}
        height={1080}
      />

      <Folder name="Acte-V">
        <Composition
          id="Plan-23-Appel"
          component={() => (
            <PlanSeul debut={3660}>
              <Plan23 />
            </PlanSeul>
          )}
          durationInFrames={180}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-24-Bouton"
          component={() => (
            <PlanSeul debut={3840}>
              <Plan24 />
            </PlanSeul>
          )}
          durationInFrames={210}
          fps={60}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
