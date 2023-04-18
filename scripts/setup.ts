/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import {
  isCancel,
  cancel,
  intro,
  multiselect,
  text,
  spinner,
  confirm,
} from '@clack/prompts';
import { writeFile, unlink } from 'fs/promises';
import { execAsync, handleEasPromise, spawned, timeout } from './helpers.js';
import appJsonFile from '../app.json';

const devMode = process.argv.includes('--dev');

intro('Setup Boilerplate Mestres da Web');

const s = spinner();

const handleSetupFirebase = async () => {
  s.start('Configurando firebase');

  await execAsync('npx expo install firebase').catch(e => {
    cancel(`Erro ao configurar o firebase, ${e.message}`);
    process.exit(1);
  });

  s.stop('Firebase configurado');
};

const handleRemoveFirebase = async () => {
  s.start('Removendo firebase');
  await unlink(
    path.resolve(__dirname, '..', 'src', 'hooks', 'useMessage.tsx'),
  ).catch(e => {
    if (e.code !== 'ENOENT') {
      cancel(`Erro ao remover o firebase, ${e.message}`);
      process.exit(1);
    }
  });

  await unlink(
    path.resolve(__dirname, '..', 'src', 'services', 'firebase.ts'),
  ).catch(e => {
    if (e.code !== 'ENOENT') {
      cancel(`Erro ao remover o firebase, ${e.message}`);
      process.exit(1);
    }
  });
  await timeout(1000);
  s.stop('Firebase removido');
};

const handleSetupBottomSheet = async () => {
  s.start('Instalando Bottom Sheet');

  await execAsync('yarn add @gorhom/bottom-sheet@^4').catch(e => {
    cancel(`Erro ao configurar o Bottom Sheet, ${e.message}`);
    process.exit(1);
  });

  s.stop('Bottom Sheet instalado');
};

const handleRemoveBottomSheet = async () => {
  s.start('Removendo Bottom Sheet');

  await execAsync('yarn remove @gorhom/bottom-sheet').catch(e => {
    if (e.code !== 'ENOENT') {
      cancel(`Erro ao remover o Bottom Sheet, ${e.message}`);
      process.exit(1);
    }
  });

  s.stop('Bottom Sheet removido');
};

const isGitBoilerplate = async () => {
  const answer = await execAsync('git remote -v');
  return answer.includes('mobile-boilerplate');
};

const removeGitBoilerplate = async () => {
  await execAsync('git remote remove origin');
};

const handleSetupExpo = async (projectName: string, projectSlug: string) => {
  appJsonFile.expo.name = projectName;
  appJsonFile.expo.slug = projectSlug;

  await writeFile(
    path.resolve(__dirname, '..', 'app.json'),
    JSON.stringify(appJsonFile, null, 2),
  );

  await execAsync('eas --version').catch(e => {
    cancel('Atualize o eas-cli para a versão mais recente. (npm i -g eas-cli)');
    process.exit(1);
  });

  const easCli = spawned(`eas init`);

  await handleEasPromise(easCli).catch(() => {
    cancel('Erro ao configurar o EAS');
    process.exit(1);
  });

  await execAsync('eas update:configure -p all');
  // await timeout(1000);
};

const handleInstallDependencies = async () => {
  s.start('Corrigindo dependências (Isso pode levar um tempo...)');

  await execAsync('yarn install').catch(e => {
    cancel(`Erro ao instalar dependências, ${e.message}`);
    process.exit(1);
  });

  s.stop('Dependências corrigidas');
};

const setup = async () => {
  const shouldRemoveGit = await isGitBoilerplate();

  const projectName = await text({
    message: 'Qual o nome do projeto',
    placeholder: 'Aplicativo Exemplo',
    validate: value => {
      if (value.length < 3) {
        return 'O nome do projeto deve ter pelo menos 3 caracteres';
      }
      if (value === 'Aplicativo Exemplo' && !devMode) {
        return "O nome do projeto deve ser diferente de 'Aplicativo Exemplo'";
      }
    },
  });

  if (isCancel(projectName)) {
    process.exit(1);
  }

  const projectSlug = await text({
    message: 'Qual o slug do projeto',
    placeholder: 'aplicativo-exemplo',
    validate: value => {
      if (value.length < 3) {
        return 'O slug do projeto deve ter pelo menos 3 caracteres';
      }
      if (value === 'aplicativo-exemplo' && !devMode) {
        return "O slug do projeto deve ser diferente de 'aplicativo-exemplo'";
      }
    },
  });

  if (isCancel(projectSlug)) {
    process.exit(1);
  }

  const features = await multiselect({
    message: 'Quais features deseja utilizar? (Selecione com espaço)',
    options: [
      { title: 'Firebase (Chat)', value: 'firebase', label: 'Firebase (Chat)' },
      { title: 'Bottom Sheet', value: 'bottom-sheet', label: 'Bottom Sheet' },
      { title: 'Nenhum', value: 'none', label: 'Nenhum' },
    ],
  });

  if (isCancel(features)) {
    process.exit(1);
  }

  const shouldSetupFirebase = features.includes('firebase');

  const shouldSetupBottomSheet = features.includes('bottom-sheet');

  const confirmed = await confirm({
    message: 'Deseja prosseguir com essas configurações?',
    active: 'Sim',
    inactive: 'Não',
  });

  if (isCancel(confirmed) || !confirmed) {
    process.exit(1);
  }

  await handleInstallDependencies();

  if (shouldRemoveGit) {
    s.start('Removendo git boilerplate');
    await removeGitBoilerplate();
    s.stop('Git boilerplate removido');
  }

  s.start('Configurando expo');
  if (!devMode) {
    await handleSetupExpo(projectName, projectSlug);
  }
  s.stop('Expo configurado');

  if (shouldSetupFirebase) {
    await handleSetupFirebase();
  } else {
    handleRemoveFirebase();
  }

  if (shouldSetupBottomSheet) {
    await handleSetupBottomSheet();
  } else {
    handleRemoveBottomSheet();
  }

  // Push Notification
};

setup();
