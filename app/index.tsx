import { useState } from 'react';
import {
  Button,
  Card,
  H1,
  H2,
  H3,
  Paragraph,
  ScrollView,
  Separator,
  Switch,
  Text,
  View,
  XStack,
  YStack,
  useThemeName,
} from 'tamagui';
import { useThemeContext } from './_layout';
import { ToggleSwitch } from '../components/ToggleSwitch';

export default function Index() {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleAnimationToggle = (checked: boolean) => {
    setAnimationEnabled(checked);
  };

  // デバッグ用にテーマ名を表示
  const currentTheme = useThemeName();

  return (
    <View flex={1} backgroundColor='$background'>
      <ScrollView flex={1}>
        <YStack padding='$4' space='$4' alignItems='center'>
          {/* Header */}
          <YStack space='$2' alignItems='center' paddingVertical='$4'>
            <H1 textAlign='center' color='$color'>
              Tamagui デモ
            </H1>
            <Paragraph textAlign='center' color='$color11' maxWidth={300}>
              Expo + Tamagui テンプレートリポジトリのデモページです
            </Paragraph>
            <Text fontSize='$3' color='$color10' textAlign='center'>
              現在のテーマ: {currentTheme} | 設定:{' '}
              {isDarkMode ? 'dark' : 'light'}
            </Text>
          </YStack>

          {/* Theme Toggle Section */}
          <Card
            elevate
            size='$4'
            bordered
            width='100%'
            maxWidth={400}
            padding='$4'
            animation='bouncy'
            hoverStyle={{ scale: 1.02 }}
            pressStyle={{ scale: 0.98 }}
          >
            <XStack alignItems='center' justifyContent='space-between'>
              <XStack alignItems='center' space='$3'>
                <Text fontSize='$5'>{isDarkMode ? '🌙' : '☀️'}</Text>
                <Text fontSize='$4' fontWeight='600' color='$color'>
                  {isDarkMode ? 'ダーク' : 'ライト'}モード
                </Text>
              </XStack>
              <Switch
                size='$2'
                checked={isDarkMode}
                onCheckedChange={handleThemeToggle}
              >
                <Switch.Thumb animation='quick' />
              </Switch>
            </XStack>
          </Card>

          {/* Components Showcase */}
          <YStack space='$4' width='100%' maxWidth={400}>
            <H2 textAlign='center' color='$color'>
              コンポーネント
            </H2>

            {/* Buttons */}
            <Card padding='$4' bordered>
              <H3 marginBottom='$3' color='$color'>
                ボタン
              </H3>
              <YStack space='$3'>
                <XStack space='$2' flexWrap='wrap' justifyContent='center'>
                  <Button
                    size='$2'
                    theme='blue'
                    animation={animationEnabled ? 'bouncy' : undefined}
                    hoverStyle={animationEnabled ? { scale: 1.1 } : {}}
                    pressStyle={animationEnabled ? { scale: 0.9 } : {}}
                  >
                    Small
                  </Button>
                  <Button
                    size='$3'
                    theme='green'
                    animation={animationEnabled ? 'bouncy' : undefined}
                    hoverStyle={animationEnabled ? { scale: 1.1 } : {}}
                    pressStyle={animationEnabled ? { scale: 0.9 } : {}}
                  >
                    Medium
                  </Button>
                  <Button
                    size='$4'
                    theme='red'
                    animation={animationEnabled ? 'bouncy' : undefined}
                    hoverStyle={animationEnabled ? { scale: 1.1 } : {}}
                    pressStyle={animationEnabled ? { scale: 0.9 } : {}}
                  >
                    Large
                  </Button>
                </XStack>
                <XStack space='$2' flexWrap='wrap' justifyContent='center'>
                  <Button variant='outlined'>❤️ Outlined</Button>
                  <Button variant='ghost'>👻 Ghost</Button>
                </XStack>
              </YStack>
            </Card>

            {/* Cards */}
            <Card padding='$4' bordered>
              <H3 marginBottom='$3' color='$color'>
                カード
              </H3>
              <YStack space='$3'>
                <Card
                  size='$2'
                  bordered
                  padding='$3'
                  backgroundColor='$blue2'
                  borderColor='$blue6'
                >
                  <Text color='$blue11'>シンプルカード</Text>
                </Card>
                <Card
                  size='$3'
                  elevate
                  padding='$4'
                  animation={animationEnabled ? 'bouncy' : undefined}
                  hoverStyle={{ scale: 1.05 }}
                  pressStyle={{ scale: 0.95 }}
                >
                  <XStack alignItems='center' space='$2'>
                    <Text fontSize='$4'>⚡</Text>
                    <Text fontWeight='600' color='$color'>
                      アニメーション付きカード
                    </Text>
                  </XStack>
                  <Text marginTop='$2' color='$color11' fontSize='$3'>
                    ホバーまたはタップで拡大します{'\n'}
                    アニメーション設定: {animationEnabled ? 'オン' : 'オフ'}
                  </Text>
                </Card>
              </YStack>
            </Card>

            {/* Typography */}
            <Card padding='$4' bordered>
              <H3 marginBottom='$3' color='$color'>
                タイポグラフィ
              </H3>
              <YStack space='$2'>
                <H1 fontSize='$8' color='$color'>
                  見出し 1
                </H1>
                <H2 fontSize='$6' color='$color'>
                  見出し 2
                </H2>
                <H3 fontSize='$5' color='$color'>
                  見出し 3
                </H3>
                <Paragraph color='$color11'>
                  これは段落テキストです。Tamaguiの美しいタイポグラフィシステムをデモンストレーションしています。
                </Paragraph>
                <Text fontSize='$2' color='$color10'>
                  小さなテキスト
                </Text>
              </YStack>
            </Card>

            {/* Layout Stacks */}
            <Card padding='$4' bordered>
              <H3 marginBottom='$3' color='$color'>
                レイアウト
              </H3>
              <YStack space='$3'>
                <Text fontWeight='600' color='$color11'>
                  XStack (横並び)
                </Text>
                <XStack space='$2' flexWrap='wrap' justifyContent='center'>
                  <View
                    width={50}
                    height={50}
                    backgroundColor='$red10'
                    borderRadius='$2'
                  />
                  <View
                    width={50}
                    height={50}
                    backgroundColor='$green10'
                    borderRadius='$2'
                  />
                  <View
                    width={50}
                    height={50}
                    backgroundColor='$blue10'
                    borderRadius='$2'
                  />
                </XStack>

                <Separator marginVertical='$2' />

                <Text fontWeight='600' color='$color11'>
                  YStack (縦並び)
                </Text>
                <YStack space='$2' alignItems='center'>
                  <View
                    width={100}
                    height={30}
                    backgroundColor='$purple10'
                    borderRadius='$2'
                  />
                  <View
                    width={80}
                    height={30}
                    backgroundColor='$orange10'
                    borderRadius='$2'
                  />
                  <View
                    width={60}
                    height={30}
                    backgroundColor='$pink10'
                    borderRadius='$2'
                  />
                </YStack>
              </YStack>
            </Card>

            {/* Switches */}
            <Card padding='$4' bordered>
              <H3 marginBottom='$3' color='$color'>
                スイッチ
              </H3>
              <YStack space='$3'>
                <XStack alignItems='center' justifyContent='space-between'>
                  <Text color='$color'>🔧 小さなスイッチ (size='$1')</Text>
                  <Switch
                    size='$1'
                    animation={animationEnabled ? 'quick' : undefined}
                  >
                    <Switch.Thumb
                      animation={animationEnabled ? 'quick' : undefined}
                    />
                  </Switch>
                </XStack>
                <XStack alignItems='center' justifyContent='space-between'>
                  <Text color='$color'>⚙️ 中サイズのスイッチ (size='$2')</Text>
                  <Switch
                    size='$2'
                    defaultChecked
                    animation={animationEnabled ? 'quick' : undefined}
                  >
                    <Switch.Thumb
                      animation={animationEnabled ? 'quick' : undefined}
                    />
                  </Switch>
                </XStack>
                <XStack alignItems='center' justifyContent='space-between'>
                  <Text color='$color'>🎛️ 大きなスイッチ (size='$3')</Text>
                  <Switch
                    size='$3'
                    animation={animationEnabled ? 'quick' : undefined}
                  >
                    <Switch.Thumb
                      animation={animationEnabled ? 'quick' : undefined}
                    />
                  </Switch>
                </XStack>
                <XStack alignItems='center' justifyContent='space-between'>
                  <Text color='$color'>🟢 テーマ付きスイッチ (green)</Text>
                  <Switch
                    size='$2'
                    theme='green'
                    defaultChecked
                    animation={animationEnabled ? 'bouncy' : undefined}
                  >
                    <Switch.Thumb
                      animation={animationEnabled ? 'bouncy' : undefined}
                    />
                  </Switch>
                </XStack>
              </YStack>
            </Card>

            {/* iOS Style Toggle Switches */}
            <Card padding='$4' bordered>
              <H3 marginBottom='$3' color='$color'>
                iOS形式トグルスイッチ
              </H3>
              <YStack space='$4'>
                <XStack alignItems='center' justifyContent='space-between'>
                  <YStack>
                    <Text color='$color' fontWeight='600'>
                      🌙 ダークモード
                    </Text>
                    <Text fontSize='$2' color='$color11'>
                      現在: {isDarkMode ? 'ダーク' : 'ライト'}テーマ
                    </Text>
                  </YStack>
                  <ToggleSwitch
                    value={isDarkMode}
                    onValueChange={() => toggleTheme()}
                    size='medium'
                    activeColor='#007AFF'
                    inactiveColor='#E5E5EA'
                  />
                </XStack>

                <XStack alignItems='center' justifyContent='space-between'>
                  <YStack>
                    <Text color='$color' fontWeight='600'>
                      ⚡ アニメーション
                    </Text>
                    <Text fontSize='$2' color='$color11'>
                      現在: {animationEnabled ? 'オン' : 'オフ'}
                    </Text>
                  </YStack>
                  <ToggleSwitch
                    value={animationEnabled}
                    onValueChange={setAnimationEnabled}
                    size='medium'
                    activeColor='#4CD964'
                    inactiveColor='#E5E5EA'
                  />
                </XStack>

                <XStack alignItems='center' justifyContent='space-between'>
                  <YStack>
                    <Text color='$color' fontWeight='600'>
                      🔔 通知
                    </Text>
                    <Text fontSize='$2' color='$color11'>
                      プッシュ通知の受信設定
                    </Text>
                  </YStack>
                  <ToggleSwitch
                    value={notificationEnabled}
                    onValueChange={setNotificationEnabled}
                    size='medium'
                    activeColor='#FF9500'
                    inactiveColor='#E5E5EA'
                  />
                </XStack>

                <XStack alignItems='center' justifyContent='space-between'>
                  <YStack>
                    <Text color='$color' fontWeight='600'>
                      🔊 サウンド
                    </Text>
                    <Text fontSize='$2' color='$color11'>
                      効果音とシステム音
                    </Text>
                  </YStack>
                  <ToggleSwitch
                    value={soundEnabled}
                    onValueChange={setSoundEnabled}
                    size='medium'
                    activeColor='#FF3B30'
                    inactiveColor='#E5E5EA'
                  />
                </XStack>

                <Separator />

                <YStack space='$3'>
                  <Text fontSize='$3' fontWeight='600' color='$color11'>
                    サイズバリエーション
                  </Text>
                  <XStack alignItems='center' justifyContent='space-between'>
                    <Text color='$color'>スモール</Text>
                    <ToggleSwitch
                      value={soundEnabled}
                      onValueChange={setSoundEnabled}
                      size='small'
                      activeColor='#34C759'
                      inactiveColor='#E5E5EA'
                    />
                  </XStack>
                  <XStack alignItems='center' justifyContent='space-between'>
                    <Text color='$color'>ミディアム</Text>
                    <ToggleSwitch
                      value={notificationEnabled}
                      onValueChange={setNotificationEnabled}
                      size='medium'
                      activeColor='#007AFF'
                      inactiveColor='#E5E5EA'
                    />
                  </XStack>
                  <XStack alignItems='center' justifyContent='space-between'>
                    <Text color='$color'>ラージ</Text>
                    <ToggleSwitch
                      value={animationEnabled}
                      onValueChange={setAnimationEnabled}
                      size='large'
                      activeColor='#AF52DE'
                      inactiveColor='#E5E5EA'
                    />
                  </XStack>
                </YStack>
              </YStack>
            </Card>

            {/* Settings */}
            <Card padding='$4' bordered>
              <H3 marginBottom='$3' color='$color'>
                設定
              </H3>
              <YStack space='$3'>
                <XStack alignItems='center' justifyContent='space-between'>
                  <YStack flex={1}>
                    <Text color='$color' fontWeight='600'>
                      ⚙️ アニメーション
                    </Text>
                    <Text fontSize='$2' color='$color11'>
                      現在の設定: {animationEnabled ? '✅ オン' : '❌ オフ'}
                    </Text>
                  </YStack>
                  <Switch
                    size='$2'
                    checked={animationEnabled}
                    onCheckedChange={handleAnimationToggle}
                  >
                    <Switch.Thumb animation='quick' />
                  </Switch>
                </XStack>
              </YStack>
            </Card>
          </YStack>

          {/* Footer */}
          <YStack space='$2' alignItems='center' paddingVertical='$6'>
            <Text fontSize='$2' color='$color10' textAlign='center'>
              Tamagui v1.132 + Expo Router
            </Text>
            <Text fontSize='$1' color='$color9' textAlign='center'>
              テンプレートリポジトリ用デモページ
            </Text>
          </YStack>
        </YStack>
      </ScrollView>
    </View>
  );
}
